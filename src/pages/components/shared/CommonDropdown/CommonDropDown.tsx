import React, { useEffect, useRef, useState } from 'react'
import './CommonDropdown.scss'
interface DropdownProps {
    list: any[],
    bindLabel: string,
    bindValue: any,
    placeholder: any,
    defaultValue: any,
    disabled: boolean,
    fieldName: string,
    selectedItem: any,
    onClickOutside?: any
}

export default function CommonDropDown(props: DropdownProps) {
    const [isShow, setIsShow] = useState(false)
    const [selectedItem, setSelectedItem] = useState({} as any);
    const [filteredList, setFilteredList] = useState([] as any);
    const { list, bindLabel, placeholder, defaultValue, disabled, fieldName, bindValue, onClickOutside } = props;
    const ref = useRef(null as any);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
                setIsShow(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    useEffect(() => {
        setFilteredList(list);
        const defaultObj: any = list?.filter(item => item[bindValue] == defaultValue)
        if (defaultObj?.length > 0) {
            setSelectedItem(defaultObj[0]);
        } else {
            setSelectedItem('');
            props.selectedItem('');
        }

    }, [list]);

    useEffect(() => {
     
        const defaultObj: any = list?.filter(item => item[bindValue] == defaultValue)
        if (defaultObj?.length > 0) {
            setSelectedItem(defaultObj[0]);
        } else {
            setSelectedItem('');
            props.selectedItem('');
        }
    }, [defaultValue]);

    const ShowHide = (value: boolean) => {
        setIsShow(value => !value)
        setFilteredList(list);
    }
    const selectItem = (event: any, item: any) => {
        event.preventDefault();
        setSelectedItem(item)
        setIsShow(false);
        props.selectedItem(item);
    }

    const search = (value: string) => {
        let filtered = list.filter(item => item[bindLabel].replace(/\s/g, '').toLowerCase().startsWith(value.replace(/\s/g, '').toLowerCase()));
        setFilteredList(filtered);
    }

    return (
        <>

            <div className="CommonDropDown" ref={ref} >
                <div className="position-relative main-drop-dwon">
                    <div className="ms-parent brand js-brand-select js-styled-select select-processed" title=""     >
                        <button type="button" className="ms-choice select-btn" onClick={() => ShowHide(true)} disabled={disabled}>
                            {Object.keys(selectedItem).length == 0 &&
                                <span className="just-placeholder">{placeholder}</span>
                            }

                            {Object.keys(selectedItem).length > 0 &&

                                <span className="value-placeholder">{selectedItem[bindLabel]}</span>
                            }

                            <div className="icon-caret"></div>
                        </button>

                        {isShow &&
                            <div className="ms-drop bottom show-drop" >
                                <div className="ms-search">
                                    <input type="text" placeholder="search" onChange={(e) => search(e.target.value)} />
                                </div>
                                <div className="listwrapper overflow-auto"><ul>

                                    {filteredList?.map((item: any, i: number) => (
                                        <li className="hide-radio " key={fieldName + '-' + i} onClick={(e) => selectItem(e, item)}>
                                            <label className="label-check" htmlFor={fieldName + '-' + i}>
                                                <input type="radio" onChange={(e) => selectItem(e, item)} checked={true} value={item[bindValue]} data-key="option_0" name={fieldName} id={fieldName + '-' + i} data-name="selectItembrand" />
                                                <span>{item[bindLabel]}</span>
                                            </label>
                                        </li>
                                    ))}

                                    {!filteredList &&
                                        <li className="ms-no-results" >No matches found</li>
                                    }

                                </ul>
                                    {/* <div className="ps__rail-x" style="left: 0px; bottom: 0px;"><div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div>
                             <div className="ps__rail-y" style="top: 0px; right: 12px; height: 250px;"><div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 100px;"></div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>

    )
}
