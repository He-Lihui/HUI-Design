import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import classNames from 'classnames';
import React, { useState, useContext, useEffect, useRef, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * ## 按钮用于开始一个即时操作
 * @param props
 * @returns
 */
var Button = function (props) {
    var _a;
    var btntype = props.btntype, size = props.size, className = props.className, disabled = props.disabled, children = props.children, href = props.href, resProps = __rest(props, ["btntype", "size", "className", "disabled", "children", "href"]);
    var element;
    var btnClass = classNames('btn', className, (_a = {},
        _a["btn-".concat(btntype)] = btntype,
        _a["btn-".concat(size)] = size,
        _a['disabled'] = (btntype === "link") && disabled,
        _a));
    if (btntype === "link" && href) {
        element = jsx("a", __assign({ className: btnClass }, resProps, { href: href }, { children: children }));
    }
    else {
        element = jsx("button", __assign({ className: btnClass, disabled: disabled }, resProps, { children: children }));
    }
    return element;
};
Button.defaultProps = {
    disabled: false,
    btntype: "default"
};

var menuIndexContext = React.createContext({ index: "0" });
var Menu = function (props) {
    var _a;
    var className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultIndex = props.defaultIndex, defaultOpen = props.defaultOpen;
    var element;
    var _b = useState(defaultIndex), currentAction = _b[0], setAction = _b[1];
    var handleClick = function (index) {
        setAction(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentAction ? currentAction : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpen: defaultOpen
    };
    var menuClass = classNames('menu', className, (_a = {},
        _a["menu-".concat(mode)] = mode,
        _a));
    var renderChildren = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: i.toString() });
            }
            else {
                console.error("Warning : Menu has a child which is not a MenuItem!");
            }
        });
    };
    element = jsx(Fragment, { children: jsx("ul", __assign({ className: menuClass, style: style }, { children: jsx(menuIndexContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) })) });
    return element;
};
Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: "0"
};

library.add(fas);
var Icon = function (props) {
    var _a;
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var IconCls = classNames('icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return (jsx(FontAwesomeIcon, __assign({ className: IconCls }, restProps)));
};

var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
};

var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(menuIndexContext);
    var defOpenSubMenu = context.defaultOpen;
    var defOpen = (index && context.mode === 'vartical') ? defOpenSubMenu === null || defOpenSubMenu === void 0 ? void 0 : defOpenSubMenu.includes(index) : false;
    var _a = useState(defOpen), isOpen = _a[0], setOpen = _a[1];
    var element;
    var subMenuClass = classNames('menu-item submenu-item', className, {
        'isActive': context.index === index,
        'is-opened': isOpen,
        'is-vertical': context.mode === "vartical"
    });
    var handleClick = function (e) {
        if (context.onSelect && (typeof index === "number")) {
            context.onSelect(index);
        }
        e.preventDefault();
        setOpen(!isOpen);
    };
    var time;
    var handleMouse = function (e, toggle) {
        clearTimeout(time);
        e.preventDefault();
        time = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var clickEvents = context.mode === 'vartical' ? {
        onClick: handleClick
    } : {};
    var renderChildren = function () {
        var cls = classNames('submenu', {
            'menu-opened': isOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var elementChildren = child;
            if (elementChildren.type.displayName === "MenuItem") {
                return React.cloneElement(elementChildren, { index: "".concat(index, "-").concat(i) });
                // return elementChildren
            }
            else {
                console.error("Warning : subMenu has a child which is not a MenuItem!");
            }
        });
        return (jsx(Transition, __assign({ in: isOpen, timeout: 300, animation: "zoom-in-top", appear: true, unmountOnExit: true }, { children: jsx("ul", __assign({ className: cls }, { children: childrenComponent })) })));
    };
    element = jsx(Fragment, { children: jsxs("li", __assign({ className: subMenuClass }, hoverEvents, { children: [jsxs("div", __assign({ className: 'submenu-title' }, clickEvents, { children: [title, jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] }), index) });
    return element;
};
SubMenu.displayName = 'SubMenu';

var MenuItem = function (props) {
    var element;
    var className = props.className, style = props.style, children = props.children, disabled = props.disabled, index = props.index;
    var itemContext = useContext(menuIndexContext);
    var itemClass = classNames('menu-item', className, {
        'is-disabled': disabled,
        'isActive': itemContext.index === index
    });
    var handleClick = function () {
        if (itemContext.onSelect && !disabled && (typeof index === "string")) {
            itemContext.onSelect(index);
        }
    };
    element = jsx(Fragment, { children: jsx("li", __assign({ className: itemClass, style: style, onClick: handleClick }, { children: children })) });
    return element;
};
MenuItem.defaultProps = {
    disabled: false
};
MenuItem.displayName = "MenuItem";

var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prefixes = props.prefixes, suffixes = props.suffixes, className = props.className, onChange = props.onChange, resprops = __rest(props, ["disabled", "size", "icon", "prefixes", "suffixes", "className", "onChange"]);
    var inputCls = classNames('input-wrapper', className, (_a = {},
        _a["input-".concat(size)] = size,
        _a['disabled'] = disabled,
        _a['input-group'] = prefixes || suffixes,
        _a['input-group-pre'] = !!prefixes,
        _a['input-group-suf'] = !!suffixes,
        _a));
    var fixedControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete resprops.defaultValue;
        resprops.value = fixedControlledValue(props.value);
    }
    return (jsx(Fragment, { children: jsxs("div", __assign({ className: inputCls }, { children: [prefixes && jsx("div", __assign({ className: "input-prefix-group" }, { children: prefixes })), icon && jsx("div", __assign({ className: "input-icon-wrapper" }, { children: jsx(Icon, { icon: icon }) })), jsx("input", __assign({ className: "input-inner", disabled: disabled, onChange: onChange }, resprops)), suffixes && jsx("div", __assign({ className: "input-suffix-group" }, { children: suffixes }))] })) }));
};

function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

function useClickOutSide(ref, handler) {
    useEffect(function () {
        var listener = function (e) {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler(e);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

var AutoComplete = function (props) {
    var onSelect = props.onSelect, fetchSuggestion = props.fetchSuggestion, value = props.value, customRenderOptions = props.customRenderOptions, restProps = __rest(props, ["onSelect", "fetchSuggestion", "value", "customRenderOptions"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), higthLightIndex = _d[0], setHightLightIndex = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var debouncedValue = useDebounce(inputValue, 500);
    var trigger = useRef(false);
    var componentRef = useRef(null);
    useEffect(function () {
        if (debouncedValue && trigger.current) {
            var res = fetchSuggestion(debouncedValue);
            if (res instanceof Promise) {
                setLoading(true);
                res.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0)
                        setShowDropdown(true);
                });
            }
            else {
                setSuggestions(res);
                setShowDropdown(true);
                if (res.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setSuggestions([]);
        }
        setHightLightIndex(-1);
    }, [debouncedValue, fetchSuggestion]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        trigger.current = true;
    };
    var renderTemplate = function (item) {
        return customRenderOptions ? customRenderOptions(item) : item.value;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        trigger.current = false;
    };
    var hightLight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHightLightIndex(index);
    };
    var handleKeydown = function (e) {
        switch (e.code) {
            case 'ArrowDown':
                hightLight(higthLightIndex + 1);
                break;
            case 'ArrowUp':
                hightLight(higthLightIndex - 1);
                break;
            case 'Enter':
                if (suggestions[higthLightIndex]) {
                    handleSelect(suggestions[higthLightIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
        }
    };
    // const renderList = () => {
    //     return (
    //         <ul>
    //             {
    //                 suggestions.map( (item, index) => {
    //                     const cls = classNames('suggestion-item',{
    //                         'item-highlighted': index === higthLightIndex
    //                     })
    //                     return(
    //                         <li key={index}
    //                         onClick={() => handleSelect(item)}
    //                         className={cls}
    //                         >{renderTemplate(item) as ReactNode }</li>
    //                     )
    //                 })
    //             }
    //         </ul>
    //     )
    // }
    var generateDropdown = function () {
        return (jsx(Transition, __assign({ in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSuggestions([]); } }, { children: jsxs("ul", __assign({ className: "suggestion-list" }, { children: [loading &&
                        jsx("div", __assign({ className: "suggstions-loading-icon" }, { children: jsx(Icon, { icon: "spinner", spin: true }) })), suggestions.map(function (item, index) {
                        var cnames = classNames('suggestion-item', {
                            'is-active': index === higthLightIndex
                        });
                        return (jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                    })] })) })));
    };
    useClickOutSide(componentRef, function () { setSuggestions([]); });
    return (jsxs("div", __assign({ className: "auto-complete", ref: componentRef }, { children: [jsx(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeydown }, restProps)), generateDropdown()] })));
};

var Progress = function (props) {
    var persent = props.persent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (jsx("div", __assign({ className: "progress-bar", style: styles }, { children: jsx("div", __assign({ className: "progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } }, { children: jsx("div", __assign({ className: "progress-bar-inner color-".concat(theme), style: { width: "".concat(persent, "px") } }, { children: showText && jsx("span", __assign({ className: "inner-text" }, { children: "".concat(persent, "%") })) })) })) })));
};
Progress.defaultProps = {
    showText: true,
    strokeHeight: 15,
    theme: 'primary'
};

var UploadList = function (props) {
    var List = props.List, onRemove = props.onRemove;
    return (jsx("ul", __assign({ className: "upload-list" }, { children: List.map(function (item) {
            return jsxs("li", __assign({ className: "upload-list-item" }, { children: [jsxs("span", __assign({ className: "file-name file-name-".concat(item.status) }, { children: [jsx(Icon, { icon: "file-alt", theme: "secondary" }), item.name] })), jsxs("span", __assign({ className: "file-status" }, { children: [item.status === 'uploading' && jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), item.status === 'success' && jsx(Icon, { icon: "check-circle", theme: "success" }), item.status === 'error' && jsx(Icon, { icon: "times-circle", theme: "danger" })] })), jsx("span", __assign({ className: "file-actions" }, { children: jsx(Icon, { icon: "times", onClick: function () { onRemove(item); } }) })), item.status === "uploading" &&
                        jsx(Progress, { persent: item.percent || 0 })] }), item.uid);
        }) })));
};

var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var cls = classNames('uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        console.log('inside drag', e.dataTransfer.files);
        onFile(e.dataTransfer.files);
    };
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (jsx("div", __assign({ className: cls, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop }, { children: children })));
};

var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, children = props.children, beforeupload = props.beforeupload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, header = props.header, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag;
    var uploadInputRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (uploadInputRef.current) {
            uploadInputRef.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFile(files);
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
    };
    var uploadFile = function (file) {
        var files = Array.from(file);
        files.forEach(function (file) {
            if (!beforeupload) {
                postFile(file);
            }
            else {
                var result = beforeupload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        postFile(processedFile);
                    });
                }
                else if (result != false) {
                    postFile(file);
                }
            }
        });
    };
    var postFile = function (file) {
        var _file = {
            uid: Date.now() + 'upload',
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file
        };
        // setFileList([_file, ...fileList])
        setFileList(function (prev) {
            return __spreadArray([_file], prev, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, header), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                if (e.total) {
                    var persent = Math.round((e.loaded) * 100 / e.total) || 0;
                    if (persent < 100) {
                        updateFileList(_file, { percent: persent, status: 'uploading' });
                        if (onProgress) {
                            onProgress(persent, file);
                        }
                    }
                }
            }
        }).then(function (response) {
            updateFileList(_file, { percent: 100, status: 'success', response: response.data });
            if (onSuccess) {
                onSuccess(response, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (jsxs("div", __assign({ className: "upload-component" }, { children: [jsxs("div", __assign({ className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ? jsx(Dragger, __assign({ onFile: function (files) { uploadFile(files); } }, { children: children })) : children, jsx("input", { type: "file", style: { display: 'none' }, ref: uploadInputRef, className: "file-input", onChange: handleFileChange, accept: accept, multiple: multiple })] })), jsx(UploadList, { List: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file'
};

var Tabs = function (props) {
    props.className; var onSelect = props.onSelect, children = props.children, defaultIndex = props.defaultIndex, type = props.type;
    var element;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (e, index, disabed) {
        if (!disabed) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var navCls = classNames('tab', {
        'nav-line': type === 'line',
        'nav-card': type === 'card'
    });
    var renderNav = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var cls = classNames('tab-item', {
                'is-active': activeIndex === i,
                'disabled': disabled
            });
            return (jsx("li", __assign({ className: cls, onClick: function (e) { handleClick(e, i, disabled); } }, { children: label }), "tab-item-".concat(i)));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, i) {
            if (i === activeIndex) {
                return child;
            }
        });
    };
    element = jsxs("div", { children: [jsx("ul", __assign({ className: navCls }, { children: renderNav() })), jsx("div", __assign({ className: "tab-content" }, { children: renderContent() }))] });
    return element;
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'card'
};

var Alert = function (props) {
    var _a;
    var type = props.type, message = props.message, description = props.description, className = props.className, closable = props.closable; props.showIcon; var onClose = props.onClose;
    var _b = useState(false), close = _b[0]; _b[1];
    var _c = useState(false), hide = _c[0], setHide = _c[1];
    var alertClass = classNames('alert', className, (_a = {},
        _a["alert-".concat(type)] = type,
        _a['isclose'] = close,
        _a));
    var element;
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    element = jsx(Fragment, { children: jsx(Transition, __assign({ in: !hide, timeout: 300, animation: "zoom-in-top" }, { children: jsxs("div", __assign({ className: alertClass }, { children: [jsxs("span", __assign({ className: "alert-message" }, { children: [message, closable && jsx("span", __assign({ className: "alert-close-btn", onClick: handleClose }, { children: "x" }))] })), description && jsx("p", __assign({ className: "alert-description" }, { children: description }))] })) })) });
    return element;
};
Alert.defaultProps = {
    type: 'default'
};

var SelectContext = createContext({ selectedValues: [] });
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 */
var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, children = props.children, multiple = props.multiple, name = props.name, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var inputRef = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    var _a = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _a[0], setSelectedValues = _a[1];
    var _b = useState(false), menuOpen = _b[0], setOpen = _b[1];
    var _c = useState(typeof defaultValue === 'string' ? defaultValue : ''), value = _c[0], setValue = _c[1];
    var handleOptionClick = function (value, isSelected) {
        // update value
        if (!multiple) {
            setOpen(false);
            setValue(value);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
        else {
            setValue('');
        }
        var updatedValues = [value];
        // click again to remove selected when is multiple mode
        if (multiple) {
            updatedValues = isSelected ? selectedValues.filter(function (v) { return v !== value; }) : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    useEffect(function () {
        // focus input
        if (inputRef.current) {
            inputRef.current.focus();
            if (multiple && selectedValues.length > 0) {
                console.log('duoxuan');
                inputRef.current.placeholder = '';
            }
            else {
                if (placeholder)
                    inputRef.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });
    useClickOutSide(containerRef, function () {
        setOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
        ref: inputRef
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, {
                    index: "select-".concat(i)
                });
            }
            else {
                console.error("Warning: Select has a child which is not a Option component");
            }
        });
    };
    var containerClass = classNames('select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple,
    });
    return (jsxs("div", __assign({ className: containerClass, ref: containerRef }, { children: [jsx("div", __assign({ className: "select-input", onClick: handleClick }, { children: jsx(Input, { ref: inputRef, placeholder: placeholder, value: value, readOnly: true, icon: "angle-down", disabled: disabled, name: name }) })), jsx(SelectContext.Provider, __assign({ value: passedContext }, { children: jsx(Transition, __assign({ in: menuOpen, animation: "zoom-in-top", timeout: 300 }, { children: jsx("ul", __assign({ className: "select-dropdown" }, { children: generateOptions() })) })) })), multiple &&
                jsx("div", __assign({ className: "selected-tags", style: { maxWidth: containerWidth.current - 32 } }, { children: selectedValues.map(function (value, index) {
                        return (jsxs("span", __assign({ className: "tag" }, { children: [value, jsx(Icon, { icon: "times", onClick: function () { handleOptionClick(value, true); } })] }), "tag-".concat(index)));
                    }) }))] })));
};
Select.defaultProps = {
    name: 'select',
    placeholder: '请选择'
};

library.add(fas);

export { Alert, AutoComplete, Button, Icon, Input, TransMenu as Menu, Progress, Select, Tabs, Transition, Upload };
