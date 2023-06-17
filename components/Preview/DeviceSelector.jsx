import React, { useState } from "react";
import { useDevices, DeviceType } from "@100mslive/react-sdk";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const DeviceSelector = () => {
  const { allDevices, selectedDeviceIDs, updateDevice } = useDevices();
  const { videoInput, audioInput, audioOutput } = allDevices;
  // Call the updateDevice function like below to update the videoInput device. Similarly for audio input and output pass corresponding deviceId and DeviceType
  //   updateDevice({
  //     deviceId,
  //     deviceType: DeviceType.videoInput,
  //   });

  console.log(
    videoInput,
    audioInput,
    audioOutput,
    selectedDeviceIDs,
    "device settings---"
  );

  const handleChange = (deviceId, type) => {
    // setAudioInputDeviceId(event.target.value)
    console.log(deviceId, "yyyyyy");

    if (type == "audioInput") {
      console.log("inside type");
      updateDevice({
        deviceId,
        deviceType: DeviceType.audioInput,
      });
    } else if (type == "audioOutput") {
      console.log("inside type");
      updateDevice({
        deviceId,
        deviceType: DeviceType.audioOutput,
      });
    } else if (type == "videoInput") {
      console.log("inside type");
      updateDevice({
        deviceId,
        deviceType: DeviceType.videoInput,
      });
    }
  };
  // render devices and selection from allDevices and selectedDeviceIDs
  return (
    <div className="w-full h-full flex justify-center items-center space-x-4">
      <div className="flex- flex-col">
        <div className="text-xs">
          *Default I/O devices are already selected.
        </div>
        <div className="text-xs">
          *You can modify if required.
        </div>
      </div>
      <FormControl sx={{ m: 1, width: 140, minHeight: 0 }} size="small">
        <InputLabel id="audioInput" style={{ color: "white" }}>
          Audio Input
        </InputLabel>
        <Select
          className="bg-[#262626] text-black w-full h-full "
          style={{ borderRadius: "20px" }}
          labelId="audioInput"
          label="audio Input"
        >
          <MenuItem disabled value="">
            <em>Select Audio Input Device</em>
          </MenuItem>
          {audioInput?.length
            ? audioInput.map((device) => (
                <MenuItem
                  value={device.label}
                  onClick={() => {
                    handleChange(device.deviceId, "audioInput");
                  }}
                >
                  {device.label}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 140, minHeight: 0 }} size="small">
        <InputLabel id="audioOutput" style={{ color: "white" }}>
          Audio Output
        </InputLabel>
        <Select
          className="bg-[#262626] text-black"
          style={{ borderRadius: "20px" }}
          labelId="audioOutput"
          label="audio Output"
        >
          <MenuItem disabled value="">
            <em>Select Audio Output Device</em>
          </MenuItem>
          {audioOutput?.length
            ? audioOutput.map((device) => (
                <MenuItem
                  value={device.label}
                  onClick={() => {
                    handleChange(device.deviceId, "audioOutput");
                  }}
                >
                  {device.label}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 140, minHeight: 0 }} size="small">
        <InputLabel id="videoInput" style={{ color: "white" }}>
          Video Input
        </InputLabel>
        <Select
          className="bg-[#262626] text-black"
          style={{ borderRadius: "20px" }}
          labelId="videoInput"
          label="video Input"
        >
          <MenuItem disabled value="">
            <em>Select Video Input Device</em>
          </MenuItem>
          {videoInput?.length
            ? videoInput.map((device) => (
                <MenuItem
                  value={device.label}
                  onClick={() => {
                    handleChange(device.deviceId, "videoInput");
                  }}
                >
                  {device.label}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  );
};

export default DeviceSelector;
