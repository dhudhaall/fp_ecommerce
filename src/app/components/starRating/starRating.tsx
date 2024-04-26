import React, { useEffect, useState } from "react";
import './StarRating.scss'


function RatingStar(props: any) {
    const [fullClass1, SetFullClass1] = useState(false);
    const [fullClass2, SetFullClass2] = useState(false);
    const [fullClass3, SetFullClass3] = useState(false);
    const [fullClass4, SetFullClass4] = useState(false);
    const [fullClass5, SetFullClass5] = useState(false);
    const [greenColor, SetGreenColor] = useState(false);
    const [orangeColor, SetOrangeColor] = useState(false);
    const [redColor, SetRedColor] = useState(false);

    const { rating } = props;

    useEffect(() => {
        getRating();
    }, [rating]);

    const getRating = () => {
        if (rating === 5) {
            SetFullClass1(true);
            SetFullClass2(true);
            SetFullClass3(true);
            SetFullClass4(true);
            SetFullClass5(true);
            SetGreenColor(true);
        } else if (rating === 4) {
            SetFullClass1(true);
            SetFullClass2(true);
            SetFullClass3(true);
            SetFullClass4(true);
            SetGreenColor(true);
        } else if (rating === 3) {
            SetFullClass1(true);
            SetFullClass2(true);
            SetFullClass3(true);
            SetOrangeColor(true);
        } else if (rating === 2) {
            SetFullClass1(true);
            SetFullClass2(true);
            SetRedColor(true);
        } else if (rating === 1) {
            SetFullClass1(true);
            SetRedColor(true);
        }

        // if(rating > 90){
        //     SetFullClass1(true);
        //     SetFullClass2(true);
        //     SetFullClass3(true);
        //     SetFullClass4(true);
        //     SetFullClass5(true);
        //     SetGreenColor(true);
        // }else if(rating > 80){
        //     SetFullClass1(true);
        //     SetFullClass2(true);
        //     SetFullClass3(true);
        //     SetFullClass4(true);
        //     SetGreenColor(true);
        // }else if(rating > 70){
        //     SetFullClass1(true);
        //     SetFullClass2(true);
        //     SetFullClass3(true);
        //     SetOrangeColor(true);
        // }else if(rating > 60){
        //     SetFullClass1(true);
        //     SetFullClass2(true);
        //     SetOrangeColor(true);
        // }else if(rating > 0){
        //     SetFullClass1(true);
        //     SetRedColor(true);
        // }


    }
    return (
        <div className="ratingStar">
            {/* <div class="stars text-center"> 
                <span className="star" [class.half]="halfClass1" [class.on]="fullClass1"></span>
                <span className="star" [class.half]="halfClass2" [class.on]="fullClass2"></span>
                <span className="star" [class.half]="halfClass3" [class.on]="fullClass3"></span>
                <span className="star" [class.half]="halfClass4" [class.on]="fullClass4"></span>
                <span className="star" [class.half]="halfClass5" [class.on]="fullClass5"></span>
            </div> */}
            <div className="stars text-center">
                <span className={`star ${fullClass1 ? 'on' : ''} ${greenColor ? 'green' : ''} ${orangeColor ? 'orange' : ''} ${redColor ? 'red' : ''} `}></span>
                <span className={`star ${fullClass2 ? 'on' : ''} ${greenColor ? 'green' : ''} ${orangeColor ? 'orange' : ''} ${redColor ? 'red' : ''} `} ></span>
                <span className={`star ${fullClass3 ? 'on' : ''} ${greenColor ? 'green' : ''} ${orangeColor ? 'orange' : ''} ${redColor ? 'red' : ''} `} ></span>
                <span className={`star ${fullClass4 ? 'on' : ''} ${greenColor ? 'green' : ''} ${orangeColor ? 'orange' : ''} ${redColor ? 'red' : ''} `} ></span>
                <span className={`star ${fullClass5 ? 'on' : ''} ${greenColor ? 'green' : ''} ${orangeColor ? 'orange' : ''} ${redColor ? 'red' : ''} `} ></span>
            </div>
        </div>
    )
}
export default RatingStar