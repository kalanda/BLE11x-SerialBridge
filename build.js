#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var config = require('./config');

// Paths
var templatesPath = "./templates";
var outputPath = "./build";

// Filepaths
var projectTemplateFile   = path.join(templatesPath, "project.template.bgproj"),
    projectOutputFile     = path.join(outputPath, "project.bgproj"),
    configTemplateFile    = path.join(templatesPath, "config.template.xml"),
    configOutputFile      = path.join(outputPath, "config.xml"),
    hardwareTemplateFile  = path.join(templatesPath, "hardware.template.xml"),
    hardwareOutputFile    = path.join(outputPath, "hardware.xml"),
    gattTemplateFile      = path.join(templatesPath, "gatt.template.xml"),
    gattOutputFile        = path.join(outputPath, "gatt.xml"),
    scriptTemplateFile    = path.join(templatesPath, "script.template.bgs"),
    scriptOutputFile      = path.join(outputPath, "script.bgs");

// Check for deviceName length
if (config.deviceName.length > 13) {
    throw new Error("deviceName is too long. Maximun lenght is 13 characters");
} else {
    config.deviceName += ' '; // Add a blank space
}

// Generate device name code
var deviceNameGeneratedCode = '';
var index = 0;

for (var i in config.deviceName) {
    deviceNameGeneratedCode += 'devicename('+i+':1) = '+config.deviceName.charCodeAt(i)+' \t # '+config.deviceName[i]+'\n';
    index++;
}

deviceNameGeneratedCode += 'devicename('+(index+0)+':1) = (mac_address(2:1)/$10) + 48 + ((mac_address(2:1)/$10)/10*7) # MAC byte 4 10th digit\n';
deviceNameGeneratedCode += 'devicename('+(index+1)+':1) = (mac_address(2:1)&$f)  + 48 + ((mac_address(2:1)&$f )/10*7) # MAC byte 4  1st digit\n';
deviceNameGeneratedCode += 'devicename('+(index+2)+':1) = (mac_address(1:1)/$10) + 48 + ((mac_address(1:1)/$10)/10*7) # MAC byte 5 10th digit\n';
deviceNameGeneratedCode += 'devicename('+(index+3)+':1) = (mac_address(1:1)&$f)  + 48 + ((mac_address(1:1)&$f )/10*7) # MAC byte 5  1st digit\n';
deviceNameGeneratedCode += 'devicename('+(index+4)+':1) = (mac_address(0:1)/$10) + 48 + ((mac_address(0:1)/$10)/10*7) # MAC byte 6 10th digit\n';
deviceNameGeneratedCode += 'devicename('+(index+5)+':1) = (mac_address(0:1)&$f)  + 48 + ((mac_address(0:1)&$f )/10*7) # MAC byte 6  1st digit\n';

/**
 * script.bgs templating
 */
fs.readFile(scriptTemplateFile, 'utf8', function(err, data) {

    if (err) throw err;

    var content = data;

    content = content.replace(/{{deviceNameGeneratedCode}}+/g, deviceNameGeneratedCode);

    fs.writeFile(scriptOutputFile, content, function(err) {
        if (err) throw err;
        console.log("The "+scriptOutputFile+" file was saved!");
    });
});


/**
 * config.xml templating
 */
fs.readFile(configTemplateFile, 'utf8', function(err, data) {

    if (err) throw err;

    var content = data;

    fs.writeFile(configOutputFile, content, function(err) {
        if (err) throw err;
        console.log("The "+configOutputFile+" file was saved!");
    });
});


/**
 * hardware.xml templating
 */
fs.readFile(hardwareTemplateFile, 'utf8', function(err, data) {

    if (err) throw err;

    var content = data;

    fs.writeFile(hardwareOutputFile, content, function(err) {
        if (err) throw err;
        console.log("The "+hardwareOutputFile+" file was saved!");
    });
});


/**
 * Gatt.xml templating
 */
fs.readFile(gattTemplateFile, 'utf8', function(err, data) {

    if (err) throw err;

    var content = data;

    content = content.replace(/{{manufacturerName}}+/g, config.manufacturerName);
    content = content.replace(/{{modelNumberString}}+/g, config.modelNumberString);
    content = content.replace(/{{firmwareRevisionString}}+/g, config.firmwareRevisionString);
    content = content.replace(/{{hardwareRevisionString}}+/g, config.hardwareRevisionString);

    fs.writeFile(gattOutputFile, content, function(err) {
      if (err) throw err;
      console.log("The "+gattOutputFile+" file was saved!");
  });
});


/**
 * project.bgproj templating
 */
fs.readFile(projectTemplateFile, 'utf8', function(err, data) {

    if (err) throw err;

    var content = data;

    content = content.replace(/{{bluegigaModel}}+/g, config.bluegigaModel);

    fs.writeFile(projectOutputFile, content, function(err) {
        if (err) throw err;
        console.log("The "+projectOutputFile+" file was saved!");
    });
});
