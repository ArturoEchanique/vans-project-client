import React from "react"
import "./MaxPassengersSlider.css"
import { ReactiveBase, RangeSlider } from "@appbaseio/reactivesearch"

const MaxPassengersSlider = ({ handlePassengersChange }) => {
    return (
        <ReactiveBase app="good-books-ds" url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io" enableAppbase>
            <div className="row">
                <div className="col">
                    <RangeSlider
                        color="red"
                        dataField="ratings_count"
                        componentId="BookSensor"
                        range={{
                            start: 0,
                            end: 12,
                        }}
                        rangeLabels={{
                            start: "0",
                            end: "12",
                        }}
                        onValueChange={function (value) {
                            handlePassengersChange({ passengersStart: value[0], passengersEnd: value[1] })
                        }}
                    />
                </div>
            </div>
        </ReactiveBase>
    )
}

export default MaxPassengersSlider
