import React, { useEffect, useRef, useState } from "react";
import "./CommonDropdown.scss";

interface DropdownProps {
  list: any[];
  bindLabel: string;
  bindValue: any;
  placeholder: string;
  defaultValue: any;
  disabled: boolean;
  fieldName: string;
  selectedItem: any;
  onClickOutside?: any;
}
export default function MultiSelectDropDown(props: DropdownProps) {
  const [isShow, setIsShow] = useState(false);
  const [selectedItems, setSelectedItem] = useState([] as any);
  const [filteredList, setFilteredList] = useState([] as any);
  const {
    list,
    bindLabel,
    placeholder,
    defaultValue,
    disabled,
    fieldName,
    bindValue,
    onClickOutside,
  } = props;
  const ref = useRef(null as any);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setIsShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  useEffect(() => {
   
    list.map((item:any)=> item.isSelected = false);
    setFilteredList(list);
      let type =typeof defaultValue;
      let selected:any[]=[];
      let defaultObj:any;
     
    if(type === "string"){
      selected  = defaultValue.split(",");
      defaultObj = list.filter((item: any) =>{ return selected?.includes(item[bindValue].toString())});
    }else if(type === 'number'){
      selected.push(defaultValue);
      defaultObj = list.filter((item: any) =>{ return selected?.includes(item[bindValue])});
    }
  
    if (defaultObj?.length > 0) {
      defaultObj?.map((item:any)=>item['isSelected'] = true);
      setSelectedItem(defaultObj);
    } else {
      setSelectedItem([]);
      props.selectedItem("");
    }
  }, [list, defaultValue]);

  const ShowHide = (value: boolean) => {
    setIsShow((value) => !value);
  };
  const selectItem = (event: any, item: any) => {
    if(event.target.checked) {
      filteredList?.map((value:any) =>{if(value[bindValue] == item[bindValue]){return value['isSelected']=true;} });
      setSelectedItem((oldItem:any)=> [...oldItem, item]);
      props.selectedItem([...selectedItems, item]);
    }else{
      filteredList?.map((value:any) =>{if(value[bindValue] == item[bindValue]){return value['isSelected']=false;}});

      setSelectedItem((oldval: any) => 
        oldval.filter((item: any) => item[bindValue] != event.target.value),
      );
     let unselected= selectedItems.filter((item: any) => item[bindValue] != event.target.value);
      props.selectedItem(
        unselected
      );
    }
    
  };

  const search = (value: string) => {
    let filtered = list.filter((item: any) =>
    item[bindLabel].replace(/\s/g, '').toLowerCase().startsWith(value.replace(/\s/g, '').toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <div className="MultiSelectDropDown" ref={ref}>
      <div className="CommonDropDown">
        <div className="position-relative main-drop-dwon">
          <div
            className="ms-parent brand js-brand-select js-styled-select select-processed"
            title=""
          >
            <button
              type="button"
              className="ms-choice select-btn"
              onClick={() => ShowHide(true)}
              disabled={disabled}
            >
              {selectedItems.length == 0 && (
                <span className="just-placeholder">{placeholder}</span>
              )}

              {selectedItems.length < 3 && selectedItems.length > 0 && selectedItems.map((selected:any, i:number)=>( <span className="value-placeholder" key={selected[bindLabel]}>
              {selected[bindLabel]}  {selectedItems.length > 1 && i+1 !== selectedItems.length && ','}
                </span>))} 

              {selectedItems.length > 2 && <span>{selectedItems.length + ' of ' + filteredList.length + ' selected'}</span>}

              <div className="icon-caret"></div>
            </button>
            {isShow && (
              <div className="ms-drop bottom show-drop">
                <div className="ms-search">
                  <input
                    type="text"
                    placeholder="search"
                    onChange={(e) => search(e.target.value)}
                  />
                </div>
                <div className="listwrapper overflow-auto">
                  <ul>
                    {filteredList?.map((item: any, i: number) => (
                      <li
                        key={fieldName + "-" + i}
                      >

                        <div className="custom-control custom-checkbox checkbox_Padding" style={{ paddingLeft: '10px' }}>
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            value={item[bindValue]}
                            checked={item['isSelected']}
                            name={fieldName + i}
                            id={item[bindLabel] + i}
                            onChange={(e:any)=>selectItem(e, item)}
                          />
                          <label
                           style={{width:'100%'}}
                            className="custom-control-label"
                            htmlFor={item[bindLabel] + i}
                          >
                            {item[bindLabel]}
                          </label>
                        </div>
                      </li>
                    ))}

                    {!filteredList && (
                      <li className="ms-no-results">No matches found</li>
                    )}
                  </ul>
                  {/* <div className="ps__rail-x" style="left: 0px; bottom: 0px;"><div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div>
                             <div className="ps__rail-y" style="top: 0px; right: 12px; height: 250px;"><div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 100px;"></div> */}
                  {/* </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
