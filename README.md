# BLE11x Serial Bridge

This is a firmware for creating a BLE to serial UART bridge using Bluegiga's BLE11x modules. This project is inspired by the awesome work of [Dr. Michael Kroll](https://github.com/michaelkroll) and [Jeff Rowberg](https://github.com/jrowberg) with Bluegiga's BLE modules BLE112 and BLE113. Some code used is from [BLE-Shield](https://github.com/michaelkroll/BLE-Shield)

## Hardware

The BLE11x pins are used as follows:

	TX             P0_4  
	RX             P0_5
	Module Wakeup  P0_7  (Pull it DOWN to wakeup the module from sleep and wait at least 1ns before send data)
	HCI Wakeup     P1_1  (The module pulls it DOWN before send data to wakeup your HCI in case is required)
	Status LED     P1_0  (Will be HIGH when connected and LOW in advertising mode)
  
*HCI = Host Control Interface or also knows as your microcontroller


## GATT Service
	
	 Simple UART Service - UUID 15AC87B6-022A-430E-9FB3-31EBB8D0BEAF
	 <- Characteristic RX - UUID EF84F28A-B51E-49FE-9FD6-F25B05C2C4A0
	 -> Characteristic TX - UUID 2CB8ADAC-7402-47FF-9937-A841CA766CA5

## How to build

**NOTE:** This build process is only needed if you want to customize the default name of the device (SerialBridge) and some other information about the device included in the firmware. 

Customize your firmware by editing `config.js` and entering your desired values.

	/**
	 * Configure here
	 */
	module.exports = {
	
	  bluegigaModel           : "ble112", // "ble112" or "ble113"
	  deviceName              : "SerialBridge", // Max 13 chars
	  manufacturerName        : "Kalanda", // Max 20 chars
	  modelNumberString       : "SerialBridge 1.0.0", // Max 20 chars
	  firmwareRevisionString  : "1.0.0", // Max 20 chars
	  hardwareRevisionString  : "1.0.0", // Max 20 chars
	
	}

To build files (needs [NodeJS](https://nodejs.org/) installed) with your customized config run:

	# node build.js

Now the folder `/build` has all files with the customized values.

## Update firmware to hardware module

To update the firmware to your BLE11x module you need a [CC Debugger and programmer from Texas Instruments](http://www.ti.com/tool/cc-debugger).

The firmware is tested with v1.3.2 build 122 of Bluegiga SDK

Open `project.bgproj` at folder `build`" with **[Bluegiga BLE SW Update Tool](https://bluegiga.zendesk.com/entries/22442106--HOW-TO-Using-the-BLE-Update-utility-to-program-a-BLE-module)** to compile and update firmware to your BLE11x module.

## License

The MIT License (MIT)

Copyright (c) 2015 @kalanda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
