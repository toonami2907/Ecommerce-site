import React from 'react'
import Modal from 'react-modal'
import { X } from 'lucide-react';
import Sign_In from '../Auth/Sign_In';
import Sign_Up from '../Auth/Sign_Up';
import Modal_Sign_Up from '../Auth/Modal_SignUp';

export default function Modal_component({modalOpen, setModalOpen}) {
  return (
    <div>
        <ul className="flex gap-2">
                          <div id="root">
                            <Modal
                              isOpen={modalOpen.isShown}
                              onRequestClose={() => {}}
                              style={{
                                overlay: {
                                  backgroundColor: "rgba(0,0,0,0.5)",
                                },
                              }}
                              contentLabel=""
                              className="max-w-full w-[90%]  relative max-h-full overflow-y-auto overflow-x-auto h-[600px]  bg-gray-100 rounded-md mt-14 p-5 mx-auto"
                            >
                              <Modal_Sign_Up setModalOpen={setModalOpen}/>
                              <button
                                onClick={() => {
                                  setModalOpen({
                                    isShown: false,
                                    type: "message",
                                    data: null,
                                  });
                                }}
                                className="absolute top-2 right-2"
                              >
                                <X />
                              </button>
                            </Modal>
                          </div>
                        </ul>
    </div>
  )
}
