import React, { Fragment, useState, ComponentPropsWithoutRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

type Props = {
  userName: string;
  isOpen: boolean;
  setIsOpen: (isOpen: (boolean)) => void
  connectRadioValue: {
    id: number,
    item: string,
    value: string,
  }[];
  onClickConnect: (connectUserName: (string), connectState: (string)) => void
} & ComponentPropsWithoutRef<"form">;

const MyModal: React.VFC<Props> = ({
  userName,
  isOpen,
  connectRadioValue,
  setIsOpen,
  onClickConnect
}) => {

  function closeModal() {
    setIsOpen(false)
  }

  const [checkedValue, setCheckedValue] = useState(connectRadioValue[0]["item"]);
  const handleChangeRadio = (e) => setCheckedValue(e.target.value);
  const RadioItems = 
  connectRadioValue.map((value, index) => {
    return (
      
      <li key={index} className="m-5 list-none">
        <label>
          <input
            type='radio'
            value={value.item}
            onChange={handleChangeRadio}
            checked={checkedValue === value.item}
          />
          {value.item}
        </label>
      </li>
    );
  });
  
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="span"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {userName}とつながりますか？
                  </Dialog.Title>
                  <div className="mt-2">
                    {RadioItems}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {userName && checkedValue && onClickConnect(userName, checkedValue);}}
                    >
                      OK
                    </button>
                    <button
                      type="button"
                      className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default MyModal;
