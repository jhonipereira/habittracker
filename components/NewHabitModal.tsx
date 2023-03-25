'use client'

import { createNewHabit } from "@/lib/api";
import { useState } from "react";
import Modal from 'react-modal'
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

const NewHabitModal = () => {
    const [name, setName] = useState('')

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const closemodal = () => setModalIsOpen(false)
    const openmodal = () => setModalIsOpen(true)

    const handlerSubmit = async (e) => {
        e.preventDefault()
        await createNewHabit(name)
        closemodal()
    }

    return (
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
            <Button onClick={() => openmodal()}>New habit</Button>

            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closemodal}
            overlayClassName="bg-[rgba(0,0,0,0.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
            className="w-3/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6">New habit</h1>
                <form className="flex items-center" onSubmit={handlerSubmit}>
                    <Input
                    placeholder="What should I start?"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                     />

                     <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    )
}

export default NewHabitModal;