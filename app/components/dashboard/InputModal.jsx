import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";

const devices = [
  { key: "device-1", label: "IoT Device 1" },
  { key: "device-2", label: "IoT Device 2" },
  { key: "device-3", label: "IoT Device 3" }
];

const InputModal = ({ isOpen, onOpenChange, onClose, dashboardTitle, onSave }) => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [dashboardName, setDashboardName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedDevice("");
      setDashboardName("");
    }
  }, [isOpen]);

  const handleDeviceChange = (value) => {
    setSelectedDevice(value);
  };

  const handleNameChange = (e) => {
    setDashboardName(e.target.value);
  };

  const handleSaveClick = () => {
    if (selectedDevice && dashboardName) {
      onSave(selectedDevice, dashboardName);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      isDismissable={false}
      placement="center"
      isKeyboardDismissDisabled={true}
      className=" w-full max-w-3xl rounded-xl border border-gray-300 backdrop-blur-md shadow-2xl mt-0"
    >
      <ModalContent className="w-10/12 bg-white/10 border border-gray-300 backdrop-blur-md shadow-2xl rounded-xl">
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1 text-white text-lg font-semibold">
              {dashboardTitle} {/* Ensure this is a string or valid JSX */}
            </ModalHeader>
            <ModalBody className="space-y-4">
              <Select
                isRequired
                label="Device"
                placeholder="Select a Device"
                className="w-full placeholder-gray-400 text-gray-700 rounded-xl border border-white/20 focus:ring-2 focus:ring-blue-400 backdrop-blur-lg transition-all duration-200 ease-in-out"
                onChange={(e) => handleDeviceChange(e.target.value)}
                value={selectedDevice}
              >
                {devices.map((device) => (
                  <SelectItem
                    className="w-full text-gray-700"
                    key={device.key}
                    value={device.key}
                  >
                    {device.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                className="w-full placeholder-gray-400 border rounded-xl border-white/20 focus:ring-2 focus:ring-blue-400 backdrop-blur-lg transition-all duration-200 ease-in-out"
                type="text"
                label="Name"
                placeholder="Enter dashboard name"
                color="default"
                isRequired
                value={dashboardName}
                onChange={handleNameChange}
              />
            </ModalBody>
            <ModalFooter className="flex justify-end space-x-4">
              <Button
                color="danger"
                variant="light"
                className="text-red-600 hover:backdrop-blur-lg rounded-lg hover:bg-red-600/20 transition-all duration-200 ease-in-out"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="bg-blue-600/80 text-white backdrop-blur-lg rounded-lg hover:bg-blue-600/100 transition-all duration-200 ease-in-out"
                onPress={handleSaveClick}
              >
                Save
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InputModal;
