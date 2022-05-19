import React from "react"
import "./PriceSlider.css"
import { ReactiveBase, RangeSlider } from "@appbaseio/reactivesearch"

const PriceSlider = ({ handlePriceChange }) => {
    return (
        <ReactiveBase app="good-books-ds" url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io" enableAppbase>
            <div className="row">
                <div className="col">
                    <RangeSlider
                        color="red"
                        dataField="ratings_count"
                        componentId="BookSensor"
                        range={{
                            start: 10,
                            end: 400,
                        }}
                        rangeLabels={{
                            start: "10€",
                            end: "400€",
                        }}
                        onValueChange={function (value) {
                            handlePriceChange({ priceStart: value[0], priceEnd: value[1] })
                        }}
                    />
                </div>
            </div>
        </ReactiveBase>
    )
}

export default PriceSlider
