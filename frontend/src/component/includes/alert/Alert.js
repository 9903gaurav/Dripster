import React from "react";

const Alert = (props) =>
  props.alertBody && (
    <div className="row fixed-bottom justify-content-center bg-transparent">
      <div className={`alert alert-${props.alertBody.type} w-auto h-auto`} role="alert">
        {props.alertBody.msg}
      </div>
    </div>
  );

export default Alert;