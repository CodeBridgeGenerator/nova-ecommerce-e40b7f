/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Chips } from 'primereact/chips';
import { Checkbox } from 'primereact/checkbox';
const statusOptions = [];

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProductsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [categoryId, setCategoryId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount categories
                    client
                        .service("categories")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCategoriesId } })
                        .then((res) => {
                            setCategoryId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Categories", type: "error", message: error.message || "Failed get categories" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
slug: _entity?.slug,
sku: _entity?.sku,
description: _entity?.description,
categoryId: _entity?.categoryId?._id,
price: _entity?.price,
discountPrice: _entity?.discountPrice,
stockQuantity: _entity?.stockQuantity,
images: _entity?.images,
tags: _entity?.tags,
status: _entity?.status,
isFeatured: _entity?.isFeatured,
        };

        setLoading(true);
        try {
            
        await client.service("products").patch(_entity._id, _data);
        const eagerResult = await client
            .service("products")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "categoryId",
                    service : "categories",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info products updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const categoryIdOptions = categoryId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Products" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="products-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Product Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="slug">Product Slug:</label>
                <InputText id="slug" className="w-full mb-3 p-inputtext-sm" value={_entity?.slug} onChange={(e) => setValByKey("slug", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["slug"]) && (
              <p className="m-0" key="error-slug">
                {error["slug"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sku">SKU:</label>
                <InputText id="sku" className="w-full mb-3 p-inputtext-sm" value={_entity?.sku} onChange={(e) => setValByKey("sku", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sku"]) && (
              <p className="m-0" key="error-sku">
                {error["sku"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputTextarea id="description" rows={5} cols={30} value={_entity?.description} onChange={ (e) => setValByKey("description", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="categoryId">Category:</label>
                <Dropdown id="categoryId" value={_entity?.categoryId?._id} optionLabel="name" optionValue="value" options={categoryIdOptions} onChange={(e) => setValByKey("categoryId", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["categoryId"]) && (
              <p className="m-0" key="error-categoryId">
                {error["categoryId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="price">Price:</label>
                <InputNumber tooltip="Use only numbers" id="price" className="w-full mb-3 p-inputtext-sm" value={_entity?.price} onValueChange={(e) => setValByKey("price", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["price"]) && (
              <p className="m-0" key="error-price">
                {error["price"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountPrice">Discount Price:</label>
                <InputNumber tooltip="Use only numbers" id="discountPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.discountPrice} onValueChange={(e) => setValByKey("discountPrice", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountPrice"]) && (
              <p className="m-0" key="error-discountPrice">
                {error["discountPrice"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stockQuantity">Stock Quantity:</label>
                <InputNumber tooltip="Use only numbers" id="stockQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.stockQuantity} onValueChange={(e) => setValByKey("stockQuantity", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stockQuantity"]) && (
              <p className="m-0" key="error-stockQuantity">
                {error["stockQuantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="images">Product Images:</label>
                <Chips id="images" className="w-full mb-3" value={_entity?.images} onChange={(e) => setValByKey("images", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["images"]) && (
              <p className="m-0" key="error-images">
                {error["images"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tags">Tags:</label>
                <Chips id="tags" className="w-full mb-3" value={_entity?.tags} onChange={(e) => setValByKey("tags", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tags"]) && (
              <p className="m-0" key="error-tags">
                {error["tags"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isFeatured">Featured Product:</label>
                <Checkbox id="isFeatured" className="ml-3" checked={_entity?.isFeatured} onChange={(e) => setValByKey("isFeatured", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isFeatured"]) && (
              <p className="m-0" key="error-isFeatured">
                {error["isFeatured"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ProductsEditDialogComponent);
