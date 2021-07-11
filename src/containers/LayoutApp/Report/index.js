import React from "react";
import { TitleTopBar, AnimateComponent } from "../../../components";
import MonthlyRegistrations from "./MonthlyRegistrations";
import Referrals from "./Referrals";
import Promotions from "./Promotions";
import Maturities from "./Maturities";
import Users from "./Users";
const Report = ({ location, ...props }) => {
  const currentKey = location.pathname.split("/")[1] || "/";
  let id = props.match.params.reports_id;

  return (
    <>
      <div>
        {(() => {
          switch (id) {
            case "altas-mensuales":
              id = "Altas mensuales";
              break;
            case "referidos":
              id = "Referidos";
              break;
            case "promociones":
              id = "Promociones";
              break;
            case "vencimientos":
              id = "Vencimientos";
              break;
            case "usuarios":
              id = "Usuarios";
              break;
            default:
              return null;
          }
        }).call(this)}
      </div>

      <TitleTopBar titleName={id} iconName="report" />
      <section className="page-main-inner">
        <AnimateComponent keyAction={currentKey} className="page-main">
          <div>
            {(() => {
              switch (id) {
                case "Altas mensuales":
                  return  <MonthlyRegistrations />;
                  break;
                case "Referidos":
                  return <Referrals />;
                  break;
                case "Promociones":
                  return <Promotions />;
                  break;
                case "Vencimientos":
                  return <Maturities />;
                  break;
                case "Usuarios":
                  return <Users />;
                  break;
                default:
                  return null;
              }
            }).call(this)}
          </div>
        </AnimateComponent>
      </section>
    </>
  );
};

export default Report;
