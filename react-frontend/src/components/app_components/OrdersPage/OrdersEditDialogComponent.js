/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
const paymentStatusOptions = [];
const orderStatusOptions = [];

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

const OrdersEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userId, setUserId] = useState([])
const [shippingAddressId, setShippingAddressId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUserId(res.data.map((e) => { return { name: e['email'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);
 useEffect(() => {
                    //on mount userAddresses
                    client
                        .service("userAddresses")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUserAddressesId } })
                        .then((res) => {
                            setShippingAddressId(res.data.map((e) => { return { name: e['address'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "UserAddresses", type: "error", message: error.message || "Failed get userAddresses" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            orderNumber: _entity?.orderNumber,
userId: _entity?.userId?._id,
items: _entity?.items,
shippingAddressId: _entity?.shippingAddressId?._id,
subtotal: _entity?.subtotal,
shippingFee: _entity?.shippingFee,
discount: _entity?.discount,
total: _entity?.total,
paymentStatus: _entity?.paymentStatus,
orderStatus: _entity?.orderStatus,
orderedAt: _entity?.orderedAt,
notes: _entity?.notes,
        };

        setLoading(true);
        try {
            
        await client.service("orders").patch(_entity._id, _data);
        const eagerResult = await client
            .service("orders")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userId",
                    service : "users",
                    select:["email"]},{
                    path : "shippingAddressId",
                    service : "userAddresses",
                    select:["address"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info orders updated successfully" });
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

    const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));
const shippingAddressIdOptions = shippingAddressId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Orders" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="orders-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderNumber">Order Number:</label>
                <InputText id="orderNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.orderNumber} onChange={(e) => setValByKey("orderNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderNumber"]) && (
              <p className="m-0" key="error-orderNumber">
                {error["orderNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userId">Customer:</label>
                <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userId"]) && (
              <p className="m-0" key="error-userId">
                {error["userId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="items">Ordered Products:</label>
                <InputTextarea id="items" rows={5} cols={30} value={_entity?.items} onChange={ (e) => setValByKey("items", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["items"]) && (
              <p className="m-0" key="error-items">
                {error["items"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingAddressId">Shipping Address:</label>
                <Dropdown id="shippingAddressId" value={_entity?.shippingAddressId?._id} optionLabel="name" optionValue="value" options={shippingAddressIdOptions} onChange={(e) => setValByKey("shippingAddressId", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingAddressId"]) && (
              <p className="m-0" key="error-shippingAddressId">
                {error["shippingAddressId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subtotal">Subtotal:</label>
                <InputNumber tooltip="Use only numbers" id="subtotal" className="w-full mb-3 p-inputtext-sm" value={_entity?.subtotal} onValueChange={(e) => setValByKey("subtotal", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subtotal"]) && (
              <p className="m-0" key="error-subtotal">
                {error["subtotal"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="shippingFee">Shipping Fee:</label>
                <InputNumber tooltip="Use only numbers" id="shippingFee" className="w-full mb-3 p-inputtext-sm" value={_entity?.shippingFee} onValueChange={(e) => setValByKey("shippingFee", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["shippingFee"]) && (
              <p className="m-0" key="error-shippingFee">
                {error["shippingFee"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discount">Discount:</label>
                <InputNumber tooltip="Use only numbers" id="discount" className="w-full mb-3 p-inputtext-sm" value={_entity?.discount} onValueChange={(e) => setValByKey("discount", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discount"]) && (
              <p className="m-0" key="error-discount">
                {error["discount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="total">Order Total:</label>
                <InputNumber tooltip="Use only numbers" id="total" className="w-full mb-3 p-inputtext-sm" value={_entity?.total} onValueChange={(e) => setValByKey("total", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["total"]) && (
              <p className="m-0" key="error-total">
                {error["total"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentStatus">Payment Status:</label>
                <Dropdown id="paymentStatus" value={_entity?.paymentStatus} options={paymentStatusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("paymentStatus", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentStatus"]) && (
              <p className="m-0" key="error-paymentStatus">
                {error["paymentStatus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderStatus">Order Status:</label>
                <Dropdown id="orderStatus" value={_entity?.orderStatus} options={orderStatusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("orderStatus", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderStatus"]) && (
              <p className="m-0" key="error-orderStatus">
                {error["orderStatus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderedAt">Order Date:</label>
                <Calendar id="orderedAt" value={_entity?.orderedAt ? new Date(_entity?.orderedAt) : null} onChange={ (e) => setValByKey("orderedAt", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderedAt"]) && (
              <p className="m-0" key="error-orderedAt">
                {error["orderedAt"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="notes">Order Notes:</label>
                <InputTextarea id="notes" rows={5} cols={30} value={_entity?.notes} onChange={ (e) => setValByKey("notes", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["notes"]) && (
              <p className="m-0" key="error-notes">
                {error["notes"]}
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

export default connect(mapState, mapDispatch)(OrdersEditDialogComponent);
