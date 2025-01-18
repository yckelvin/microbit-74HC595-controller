# microbit-74HC595-controller

This repository provides a MakeCode extension for controlling a 74HC595 shift register using a Micro:bit. The extension allows users to initialize the shift register with specific data, clock, and latch pins, and control up to 21 individual outputs. It is designed for projects requiring multiple output control, such as managing a 21-cell smart pillbox.

Features:
Initialize 74HC595: Configure the data, clock, and latch pins of the shift register.
Open Specific Outputs: Control specific outputs by specifying a weekday (0=Sunday, 6=Saturday) and time of day (0=Morning, 1=Afternoon, 2=Evening).
MakeCode Integration: Fully integrates with Microsoft MakeCode, allowing users to use blocks, JavaScript, or Python to program their projects.
This extension simplifies complex GPIO operations and provides a scalable solution for managing multiple outputs with minimal hardware connections.
