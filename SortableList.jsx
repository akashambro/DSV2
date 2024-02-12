import React, { useEffect } from 'react';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchTopSkill } from '../../../api/fetchAllData/fetchTopSkill';
import { SortableItem } from './SortableItem';
import { setMySkill } from '../../../reducer/mySkills/SkillSelectedSlice';
import ReorderSkillsApi from '../../../api/skillOwner/dragAndDrop/ReorderSkillsApi';

const SortableList = () => {

    const dispatch = useDispatch();
    const topSkill = useSelector(state => state.TopSkill);
    const selectedLanguage = useSelector(state => state.language);
    const [items, setItems] = useState([]);

    useEffect(() => {

        if (topSkill.status === "idle") {
            dispatch(fetchTopSkill())
        }

        if (topSkill.status === "success") {
            setItems(topSkill.data.filter(item => item.mlanguage === selectedLanguage))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topSkill.status, selectedLanguage, topSkill.data])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    console.log(items);


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={item.userRank} id={item} />
                ))}
            </SortableContext>
        </DndContext>
    );

    async function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id === over.id) {
            dispatch(setMySkill(active.id))
        }

        if (active.id !== over.id) {
            const updatedItems = arrayMove(
                items,
                active.id.userRank - 1,
                over.id.userRank - 1
            );

            const updatedItemsWithRank = updatedItems.map((item, index) => ({
                ...item,
                userRank: index + 1,
            }));

            setItems(updatedItemsWithRank);

            // send post request to update the rank
            ReorderSkillsApi(updatedItemsWithRank).then((res) => {
                console.log(res);
                if(res.status === 200){
                    dispatch(fetchTopSkill())
                }
            }).catch((err) => {
                console.log(err);
            })

        }
    }




};

export default SortableList;
