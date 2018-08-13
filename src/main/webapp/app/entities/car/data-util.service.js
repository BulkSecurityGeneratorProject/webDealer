/*
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { Injectable } from '@angular/core';

/**
 * An utility service for data.
 */
var DDwebDataUtils = (function () {
    function DDwebDataUtils() {
    }
    /**
     * Method to abbreviate the text given
     */
    /**
         * Method to abbreviate the text given
         */
    DDwebDataUtils.prototype.abbreviate = /**
         * Method to abbreviate the text given
         */
    function (text, append) {
        if (append === void 0) { append = '...'; }
        if (text.length < 30) {
            return text;
        }
        return text ? (text.substring(0, 15) + append + text.slice(-10)) : '';
    };
    /**
     * Method to find the byte size of the string provides
     */
    /**
         * Method to find the byte size of the string provides
         */
    DDwebDataUtils.prototype.byteSize = /**
         * Method to find the byte size of the string provides
         */
    function (base64String) {
        return this.formatAsBytes(this.size(base64String));
    };
    /**
     * Method to open file
     */
    /**
         * Method to open file
         */
    DDwebDataUtils.prototype.openFile = /**
         * Method to open file
         */
    function (contentType, data) {
        var fileURL = "data:" + contentType + ";base64," + data;
        var win = window.open();
        win.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    };
    /**
     * Method to convert the file to base64
     */
    /**
         * Method to convert the file to base64
         */
    DDwebDataUtils.prototype.toBase64 = /**
         * Method to convert the file to base64
         */
    function (file, cb) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (e) {
            var base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
            cb(base64Data);
        };
    };
    /**
     * Method to clear the input
     */
    /**
         * Method to clear the input
         */
    DDwebDataUtils.prototype.clearInputImage = /**
         * Method to clear the input
         */
    function (entity, elementRef, field, fieldContentType, idInput, index,callback) {
        if (entity && field && fieldContentType) {
            if (entity.hasOwnProperty(field)) {
                entity[field].splice(index,1);
                callback();
            }
            if (elementRef && idInput && elementRef.nativeElement.querySelector('#' + idInput)) {
                elementRef.nativeElement.querySelector('#' + idInput).value = null;
            }
        }
    };
    DDwebDataUtils.prototype.endsWith = function (suffix, str) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    DDwebDataUtils.prototype.paddingSize = function (value) {
        if (this.endsWith('==', value)) {
            return 2;
        }
        if (this.endsWith('=', value)) {
            return 1;
        }
        return 0;
    };
    DDwebDataUtils.prototype.size = function (value) {
        return value.length / 4 * 3 - this.paddingSize(value);
    };
    DDwebDataUtils.prototype.formatAsBytes = function (size) {
        return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
    };
    DDwebDataUtils.prototype.setFileData = function (event, entity, field, isImage, callback) {
        if (event && event.target.files && event.target.files[0]) {
            var file_1 = event.target.files[0];
            if (isImage && !/^image\//.test(file_1.type)) {
                return;
            }
            this.toBase64(file_1, function (base64Data) {
                entity.img = base64Data;
                entity.type = file_1.type;
                callback();
            });
        }
    };
    DDwebDataUtils.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DDwebDataUtils.ctorParameters = function () { return []; };
    return DDwebDataUtils;
}());
export { DDwebDataUtils };
