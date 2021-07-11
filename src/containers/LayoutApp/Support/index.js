import React from "react";
import { TitleTopBar, AnimateComponent } from "../../../components";
import RecoverCAE from "./RecoverCAE";
import MassDeleteData from "./MassDeleteData";
import RegeneratePDF from "./RegeneratePDF";
import ChangeParentCompany from "./ChangeParentCompany";
import UnifyPeople from "./UnifyPeople";
import AddDaughterCompany from "./AddDaughterCompany";
import ReprocessSalesOrder from "./ReprocessSalesOrder";
// import ReprocessBalance from "./ReprocessBalance";
// import ImportPosts from "./ImportPosts";
// import UpdateAccountingAccounts from "./UpdateAccountingAccounts";
// import UpdatePrices from "./UpdatePrices";


const Support = ({ location, ...props }) => {
  const currentKey = location.pathname.split("/")[1] || "/";

  let id = props.match.params.support_id;

  return (
    <>
      <div>
        {(() => {
          switch (id) {
            case "recuperar-cae":
              id = "Recuperar CAE";
              break;
            case "regenerar-pdf":
              id = "Regenerar PDF";
              break;
            case "EliminarMasivamente":
              id = "Eliminar datos masivamente";
              break;

            case "cambiar-empresa-padre":
              id = "Cambiar empresa padre";
              break;

            case "unificar-personas":
              id = "Unificar personas";
              break;

            case "agregar-empresa-hija":
              id = "Agregar empresa hija";
              break;

            case "reprocesar-orden-venta":
              id = "Reprocesar orden venta";
              break;

            // case "reprocesar-saldo":
            //   id = "Reprocesar saldo";
            //   break;

            // case "importar-publicaciones":
            //   id = "Importar publicaciones";
            //   break;

            // case "actualizar-cuentas-contables":
            //   id = "Actualizar cuentas contables";
            //   break;

            // case "actualizar-precios":
            //   id = "Actualizar precios";
            //   break;

            default:
              return null;
          }
        }).call(this)}
      </div>
      <TitleTopBar titleName={id} iconName="support" />
      <section className="page-main-inner">
        <AnimateComponent keyAction={currentKey} className="page-main">
          <div>
            {(() => {
              switch (id) {
                case "Recuperar CAE":
                  return <RecoverCAE />;

                case "Regenerar PDF":
                  return <RegeneratePDF/>;

                case "Eliminar datos masivamente":
                  return <MassDeleteData />;

                case "Cambiar empresa padre":
                  return <ChangeParentCompany/>;

                case "Unificar personas":
                  return <UnifyPeople/>;

                case "Agregar empresa hija":
                  return <AddDaughterCompany/>;

                case "Reprocesar orden venta":
                  return <ReprocessSalesOrder/>;

                // case "Reprocesar saldo":
                //   return <ReprocessBalance/>;  

                // case "Importar publicaciones":
                //   return <ImportPosts/>;

                // case "Actualizar cuentas contables":
                //   return <UpdateAccountingAccounts/>;

                // case "Actualizar precios":
                //   return <UpdatePrices/>;

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

export default Support;
