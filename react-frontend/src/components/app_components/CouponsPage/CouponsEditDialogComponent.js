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
import { Calendar } from 'primereact/calendar';
const discountTypeOptions = [];
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

const CouponsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            code: _entity?.code,
description: _entity?.description,
discountType: _entity?.discountType,
discountValue: _entity?.discountValue,
minimumOrderAmount: _entity?.minimumOrderAmount,
usageLimit: _entity?.usageLimit,
usedCount: _entity?.usedCount,
startsAt: _entity?.startsAt,
expiresAt: _entity?.expiresAt,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        const result = await client.service("coupons").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info coupons updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Discount Coupons" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="coupons-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="code">Coupon Code:</label>
                <InputText id="code" className="w-full mb-3 p-inputtext-sm" value={_entity?.code} onChange={(e) => setValByKey("code", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["code"]) && (
              <p className="m-0" key="error-code">
                {error["code"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputTextarea id="description" rows={5} cols={30} value={_entity?.description} onChange={ (e) => setValByKey("description", e.target.value)} autoResize  />
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
                <label htmlFor="discountType">Discount Type:</label>
                <Dropdown id="discountType" value={_entity?.discountType} options={discountTypeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("discountType", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountType"]) && (
              <p className="m-0" key="error-discountType">
                {error["discountType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discountValue">Discount Value:</label>
                <InputNumber tooltip="Use only numbers" id="discountValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.discountValue} onValueChange={(e) => setValByKey("discountValue", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discountValue"]) && (
              <p className="m-0" key="error-discountValue">
                {error["discountValue"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="minimumOrderAmount">Minimum Order Amount:</label>
                <InputNumber tooltip="Use only numbers" id="minimumOrderAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.minimumOrderAmount} onValueChange={(e) => setValByKey("minimumOrderAmount", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["minimumOrderAmount"]) && (
              <p className="m-0" key="error-minimumOrderAmount">
                {error["minimumOrderAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="usageLimit">Usage Limit:</label>
                <InputNumber tooltip="Use only numbers" id="usageLimit" className="w-full mb-3 p-inputtext-sm" value={_entity?.usageLimit} onValueChange={(e) => setValByKey("usageLimit", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["usageLimit"]) && (
              <p className="m-0" key="error-usageLimit">
                {error["usageLimit"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="usedCount">Used Count:</label>
                <InputNumber tooltip="Use only numbers" id="usedCount" className="w-full mb-3 p-inputtext-sm" value={_entity?.usedCount} onValueChange={(e) => setValByKey("usedCount", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["usedCount"]) && (
              <p className="m-0" key="error-usedCount">
                {error["usedCount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startsAt">Start Date:</label>
                <Calendar id="startsAt" value={_entity?.startsAt ? new Date(_entity?.startsAt) : null} onChange={ (e) => setValByKey("startsAt", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startsAt"]) && (
              <p className="m-0" key="error-startsAt">
                {error["startsAt"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expiresAt">Expiry Date:</label>
                <Calendar id="expiresAt" value={_entity?.expiresAt ? new Date(_entity?.expiresAt) : null} onChange={ (e) => setValByKey("expiresAt", new Date(e.value))} showIcon showButtonBar  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expiresAt"]) && (
              <p className="m-0" key="error-expiresAt">
                {error["expiresAt"]}
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

export default connect(mapState, mapDispatch)(CouponsEditDialogComponent);
