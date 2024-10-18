import React, { Fragment } from "react";
import Items from "./Items";
import { sidebarDatas } from "../../Assets/locales/sidebar";

const MenuItems = () => {
    return (
        <Fragment>
            <ul>
                {sidebarDatas?.map((data, i) => {
                    return <Items data={data} key={Math.random()} />;
                })}
            </ul>
        </Fragment>
    );
};

export default MenuItems;
