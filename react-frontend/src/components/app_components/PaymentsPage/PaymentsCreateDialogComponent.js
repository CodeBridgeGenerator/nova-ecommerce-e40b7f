import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
const paymentMethodOptions = [];
const statusOptions = [];

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const PaymentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [orderId, setOrderId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [orderId], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.orderId)) {
                error["orderId"] = `Order field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.paymentMethod)) {
                error["paymentMethod"] = `Payment Method field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.amount)) {
                error["amount"] = `Payment Amount field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Payment Status field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            orderId: _entity?.orderId?._id,transactionId: _entity?.transactionId,paymentMethod: _entity?.paymentMethod,amount: _entity?.amount,status: _entity?.status,paidAt: _entity?.paidAt,response: _entity?.response,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("payments").create(_data);
        const eagerResult = await client
            .service("payments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "orderId",
                    service : "orders",
                    select:["orderNumber"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Payments updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Payments" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount orders
                    client
                        .service("orders")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleOrdersId } })
                        .then((res) => {
                            setOrderId(res.data.map((e) => { return { name: e['orderNumber'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Orders", type: "error", message: error.message || "Failed get orders" });
                        });
                }, []);

    
    
    

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

    const orderIdOptions = orderId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="orderId">Order:</label>
                <Dropdown id="orderId" value={_entity?.orderId?._id} optionLabel="name" optionValue="value" options={orderIdOptions} onChange={(e) => setValByKey("orderId", {_id : e.value})}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["orderId"]) ? (
              <p className="m-0" key="error-orderId">
                {error["orderId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="transactionId">Transaction ID:</label>
                <InputText id="transactionId" className="w-full mb-3 p-inputtext-sm" value={_entity?.transactionId} onChange={(e) => setValByKey("transactionId", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["transactionId"]) ? (
              <p className="m-0" key="error-transactionId">
                {error["transactionId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <Dropdown id="paymentMethod" value={_entity?.paymentMethod} options={paymentMethodOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("paymentMethod", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) ? (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amount">Payment Amount:</label>
                <InputNumber tooltip="Use only numbers" id="amount" className="w-full mb-3 p-inputtext-sm" value={_entity?.amount} onValueChange={(e) => setValByKey("amount", e.value)} mode="decimal" minFractionDigits={2} useGrouping={false}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amount"]) ? (
              <p className="m-0" key="error-amount">
                {error["amount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Payment Status:</label>
                <Dropdown id="status" value={_entity?.status} options={statusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("status", e.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paidAt">Payment Date:</label>
                <Calendar id="paidAt"  value={_entity?.paidAt ? new Date(_entity?.paidAt) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("paidAt", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paidAt"]) ? (
              <p className="m-0" key="error-paidAt">
                {error["paidAt"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="response">Gateway Response:</label>
                <InputTextarea id="response" rows={5} cols={30} value={_entity?.response} onChange={ (e) => setValByKey("response", e.target.value)} autoResize  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["response"]) ? (
              <p className="m-0" key="error-response">
                {error["response"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(PaymentsCreateDialogComponent);
