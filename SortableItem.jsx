import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDragMoveFill } from 'react-icons/ri';

export function SortableItem(props) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        minWidth: "100%"
    }


    return (
        <tr className=""     ref={setNodeRef} style={style} {...attributes} {...listeners} key={props.id.skill}>
            <td style={{ minWidth: "100%" }}  >{props.id.userSkill}</td>
            {/* <td className="font-6" style={{ width: "35%" }}>
                {DayDifferenceToDynamicView(props.id.yoe)}
            </td> */}
            <td style={{width:"1%"}}><RiDragMoveFill/></td>
        </tr>

    )
}