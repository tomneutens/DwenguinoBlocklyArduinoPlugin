/**
 * @fileoverview Generating Dwenguino blocks.
 * @author tom.neutens@UGent.be     (Tom Neutens)
 */
'use strict';

goog.provide('Blockly.Arduino.dwenguino');

goog.require('Blockly.Arduino');


// This is now integrated in the setup loop structure so children don't have to know about the initialisation step and can just start coding
Blockly.Arduino['initdwenguino'] = function (block) {

//    Blockly.Arduino.definitions_['define_wire_h'] = '#include <Wire.h>\n';
//    Blockly.Arduino.definitions_['define_dwenguino_h'] = '#include <Dwenguino.h>\n';
//    Blockly.Arduino.definitions_['define_lcd_h'] = '#include <LiquidCrystal.h>\n';

    //Blockly.Arduino.setups_['initDwenguino'] = 'initDwenguino();';
    //var code = 'initDwenguino();';
    return code;
};

Blockly.Arduino['setup_loop_structure'] = function (block) {
    Blockly.Arduino.definitions_['define_wire_h'] = '#include <Wire.h>\n';
    Blockly.Arduino.definitions_['define_dwenguino_h'] = '#include <Dwenguino.h>\n';
    Blockly.Arduino.definitions_['define_lcd_h'] = '#include <LiquidCrystal.h>\n';

    var statements_setup = Blockly.Arduino.statementToCode(block, 'SETUP');
    var statements_loop = Blockly.Arduino.statementToCode(block, 'LOOP');
    // Assemble Arduino into code variable.
    Blockly.Arduino.setups_['userSetupCode'] = 'initDwenguino();\n' + statements_setup + "\n";

    return statements_loop;

    
};


Blockly.Arduino['set_leds'] = function (block) {
    var value_register_value = Blockly.Arduino.valueToCode(block, 'register value', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'LEDS = ' + value_register_value + ';\n';
    return code;
};



Blockly.Arduino['dc_motor'] = function (block) {
    var value_channel = Blockly.Arduino.valueToCode(block, 'channel', Blockly.Arduino.ORDER_ATOMIC);
    var value_speed = Blockly.Arduino.valueToCode(block, 'speed', Blockly.Arduino.ORDER_ATOMIC);
    //import dwenguino motors
    Blockly.Arduino.definitions_['define_dwenguinomotor_h'] = "#include <DwenguinoMotor.h>\n";
    // declare motor on chosen channel
    Blockly.Arduino.definitions_['declare_dc_motor_on_channel_' + value_channel] = 'DCMotor dcMotor' + value_channel + '(MOTOR_' + value_channel + '_0, MOTOR_' + value_channel + '_1);\n';
    //start motor
    var code = 'dcMotor' + value_channel + '.setSpeed(' + value_speed + ');\n';
    return code;
};

Blockly.Arduino['dwenguino_lcd'] = function (block) {
    var value_text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC);
    var value_line_number = Blockly.Arduino.valueToCode(block, 'line_number', Blockly.Arduino.ORDER_ATOMIC);
    var value_character_number = Blockly.Arduino.valueToCode(block, 'character_number', Blockly.Arduino.ORDER_ATOMIC);
    // Assemble JavaScript into code variable.
    //import dwenguino lcd
    Blockly.Arduino.definitions_['define_lcd_h'] = "#include <LiquidCrystal.h>\n";
    var code = 'dwenguinoLCD.setCursor(' + value_character_number + ',' + value_line_number + ');\n';
    code = code + 'dwenguinoLCD.print(' + value_text + ');\n'
    return code;
};

Blockly.Arduino['clear_lcd'] = function (block) {
    //  Assemble JavaScript into code variable.
    var code = 'dwenguinoLCD.clear();\n';
    return code;
};

Blockly.Arduino['sonar_sensor'] = function (block) {
    var value_trig = Blockly.Arduino.valueToCode(block, 'trig', Blockly.Arduino.ORDER_NONE);
    var value_echo = Blockly.Arduino.valueToCode(block, 'echo', Blockly.Arduino.ORDER_NONE);
    //define sonar settings
    Blockly.Arduino.definitions_['define_newping_h'] = "#include <NewPing.h>\n";
    Blockly.Arduino.definitions_['define_sonar_trig_' + value_trig] = "#define TRIGGER_PIN_" + value_trig + " " + value_trig + "\n";
    Blockly.Arduino.definitions_['define_sonar_echo_ ' + value_echo] = "#define ECHO_PIN_" + value_echo + " " + value_echo + "\n";
    Blockly.Arduino.definitions_['define_sonar_max_distance'] = "#define MAX_DISTANCE 200 \n";
    //define sonar sensor
    Blockly.Arduino.definitions_['define_sonar_sensor_' + value_trig + value_echo] = "NewPing sonar" 
            + value_trig + value_echo + "(TRIGGER_PIN_" + value_trig + ", ECHO_PIN_" + value_echo + ", MAX_DISTANCE);\n";
    //  Assemble Arduino into code variable.
    var code = "sonar" + value_trig + value_echo + '.ping_cm()';

    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['dwenguino_servo'] = function (block) {
    var value_channel = Blockly.Arduino.valueToCode(block, 'channel', Blockly.Arduino.ORDER_ATOMIC);
    var value_angle = Blockly.Arduino.valueToCode(block, 'angle', Blockly.Arduino.ORDER_ATOMIC);

    //define sonar settings
    Blockly.Arduino.definitions_['define_servo_h'] = "#include <Servo.h>\n";
    Blockly.Arduino.definitions_['define_servo_' + value_channel] = "Servo servo" + value_channel + ";\n";

    Blockly.Arduino.setups_['define_dwenguino_servo' + value_channel] = 'servo' + value_channel + '.attach(SERVO_' + value_channel + ');\n';

    // Assemble JavaScript into code variable.
    var code = 'servo' + value_channel + '.write(' + value_angle + ');\n';
    return code;
};

Blockly.Arduino['dwenguino_controls_while'] = function (block) {
    var value_condition = Blockly.Arduino.valueToCode(block, 'CONDITION', Blockly.Arduino.ORDER_ATOMIC);
    var statements_looped_code = Blockly.Arduino.statementToCode(block, 'LOOPED_CODE');
    //  Assemble Arduino into code variable.
    var code = 'while(' + value_condition + '){\n'
            + statements_looped_code + '\n}\n';
    return code;
};


Blockly.Arduino['dwenguino_constants'] = function (block) {
    var constant_value = block.getFieldValue('DWENGUINO_CONSTANT');
    return [constant_value, Blockly.Arduino.ORDER_ATOMIC];
};