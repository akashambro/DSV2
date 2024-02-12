import React, { useEffect, useState } from 'react'
import SecondaryBtn from '../../Buttons/SecondaryBtn'
import MultiSelect from '../SelectComponent/MultiSelect';

const TrainSkillConfForm = ({ formvalues4, setFormValues4, setValidation, setFileupload, handleSubmit, disabled }) => {

    const [onGoing, setOnGoing] = useState(false);
    const [locationForTSC, setLocationForTSC] = useState("")


    const handleValidateProject = () => {
        setValidation(true);
    };

    useEffect(() => {
        if (locationForTSC.length > 0) {
            setFormValues4({ ...formvalues4, location: locationForTSC })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationForTSC])


    const handleSubmitDate = (close) => {
        handleSubmit(close)
    }

    return (
        <>
            <div className='ms-3 '>
                <div className="mb-2  ">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Organization Name<span className='text-danger' >*</span></label>
                    <input type="text" style={{ height: "32px" }} className="form-control bg-body-tertiary" id="exampleFormControlInput1" value={formvalues4.source} name='source' onChange={(e) => setFormValues4({ ...formvalues4, [e.target.name]: e.target.value })} />
                </div>
                <div class="my-2 ">
                    <label for="exampleFormControlInput1" class="form-label">Location</label>
                    <MultiSelect setLocationData={setLocationForTSC} />

                </div>
                <div className='d-lg-flex my-2 '>
                    <div className=" w-100 ">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Start Date <span className='text-danger' >*</span></label>
                        <input type="date" style={{ height: "32px" }} className="form-control bg-body-tertiary" id="exampleFormControlInput1" name='fromDate' onChange={(e) => setFormValues4({ ...formvalues4, [e.target.name]: e.target.value })} value={formvalues4.fromDate} />
                    </div>
                    <div className=" ms-lg-2 w-100 ">
                        <label htmlFor="exampleFormControlInput1" className={onGoing.trainingEndDate ? "form-label text-secondary  " : "form-label"}>End Date </label>
                        <input type="date" style={{ height: "32px" }} className={onGoing.trainingEndDate ? "form-control bg-body-tertiary text-secondary  " : "form-control bg-body-tertiary"} id="exampleFormControlInput1" name='toDate' onChange={(e) => setFormValues4({ ...formvalues4, [e.target.name]: e.target.value })} value={formvalues4.toDate}
                            {...onGoing.trainingEndDate && { disabled: true }} />
                        <div className={onGoing.trainingEndDate ? 'd-flex ms-1 align-items-center font-6 text-secondary   ' : 'd-flex ms-1 align-items-center font-6 text-secondary   '} >
                            <label htmlFor="exampleFormControlInput1" className="">Current Institute </label>
                            <input className='ms-2 ' type="checkbox" name="trainingEndDate" checked={onGoing.trainingEndDate} onChange={(e) => setOnGoing({ ...onGoing, [e.target.name]: e.target.checked })} />
                        </div>
                    </div>
                </div>
                <div className="my-2 ">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Brief Description <span className='text-danger' >*</span></label>
                    <textarea className="form-control bg-body-tertiary" id="exampleFormControlTextarea1" rows="2" value={formvalues4.briefDescriptions} name='briefDescriptions' onChange={(e) => setFormValues4({ ...formvalues4, [e.target.name]: e.target.value })} >
                    </textarea>
                </div>
                <div className="d-flex justify-content-between align-items-baseline   ">
                    <div>
                        <SecondaryBtn label="Validate this project" onClick={handleValidateProject} backgroundColor="#F8F8E9" color="#815F0B" />
                        <div id="emailHelp" class="form-text">
                            <a href="/">Require Validation support?</a>
                        </div>

                    </div>
                    <SecondaryBtn label="Attach related documents" onClick={() => setFileupload(true)} backgroundColor="#F8F8E9" color="#815F0B" />

                </div>
                <div className="modal-footer d-flex justify-content-end  ">

                    <div className='d-flex gap-1 ' >
                        <div data-bs-dismiss="modal">
                            <SecondaryBtn label="Save & Close" backgroundColor="#F8F8E9" color="#815F0B" onClick={() => handleSubmitDate(true)} disabled={disabled} />
                        </div>
                        <SecondaryBtn label="Save" onClick={() => handleSubmitDate(false)} backgroundColor="#F8F8E9" color="#815F0B" disabled={disabled} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default TrainSkillConfForm