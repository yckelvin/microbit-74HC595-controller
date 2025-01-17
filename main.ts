// 模組內變量，用於存儲腳位
let dataPin: DigitalPin = DigitalPin.P0
let clockPin: DigitalPin = DigitalPin.P1
let latchPin: DigitalPin = DigitalPin.P2

/**
 * 初始化腳位
 * @param data 74HC595 的 DATA 腳位
 * @param clock 74HC595 的 CLOCK 腳位
 * @param latch 74HC595 的 LATCH 腳位
 */
function initPins(data: DigitalPin, clock: DigitalPin, latch: DigitalPin): void {
    dataPin = data
    clockPin = clock
    latchPin = latch
}

/**
 * 發送數據到 74HC595
 * @param data 要輸出的 8 位數據
 */
function shiftOut(data: number): void {
    for (let i = 0; i < 8; i++) {
        let bit = (data >> (7 - i)) & 0x01
        pins.digitalWritePin(dataPin, bit)
        pins.digitalWritePin(clockPin, 1)
        pins.digitalWritePin(clockPin, 0)
    }
}

/**
 * 更新 74HC595 的輸出
 * @param values 每個 74HC595 的數據陣列
 */
function updateShiftRegister(values: number[]): void {
    pins.digitalWritePin(latchPin, 0) // LATCH 低電平
    for (let value of values) {
        shiftOut(value)
    }
    pins.digitalWritePin(latchPin, 1) // LATCH 高電平
}

/**
 * 開啟特定藥格
 * @param cellX 星期 (0=星期日, 6=星期六)
 * @param cellY 時間 (0=早上, 1=中午, 2=晚上)
 */
function open(cellX: number, cellY: number): void {
    let lockNumber = cellX * 3 + cellY // 計算藥格號碼 (0~20)
    let chip = Math.idiv(lockNumber, 8) // 計算該藥格所屬芯片
    let bit = lockNumber % 8 // 計算藥格在芯片中的位置

    // 初始化數據
    let data = [0x00, 0x00, 0x00]
    data[chip] = 1 << (7 - bit)

    // 更新到 74HC595
    updateShiftRegister(data)
}

//% weight=100 color=#0fbc11 icon=""  // This is a valid Unicode icon
namespace HC595 {
    /**
     * Initialize 74HC595 pins
     * @param data 74HC595 DATA pin
     * @param clock 74HC595 CLOCK pin
     * @param latch 74HC595 LATCH pin
     */
    //% blockId=hc595_init block="initialize HC595 with DATA %data|CLOCK %clock|LATCH %latch"
    export function initialize(data: DigitalPin, clock: DigitalPin, latch: DigitalPin): void {
        initPins(data, clock, latch);
    }

    /**
     * Open a specific cell
     * @param cellX Day of the week (0=Sunday, 6=Saturday)
     * @param cellY Time of day (0=Morning, 1=Afternoon, 2=Evening)
     */
    //% blockId=hc595_open block="open cell at week %cellX|time %cellY"
    export function openCell(cellX: number, cellY: number): void {
        open(cellX, cellY);
    }
}

