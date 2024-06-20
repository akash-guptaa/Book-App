import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Redirect, Navigate } from "react-router-dom";
import HeaderIndex from "./common/header";
import LoginIndex from "../components/auth";
import ForgotPasswordIndex from "../components/auth/forgotpassword"; 
import LogoutIndex from "../components/auth/logout";
import YellowBorderBottom from './common/header/yellowborderbottom';
import DashBoardIndex from "./dashboard/index";
import CompanySelectIndex from "./companyselect/index"; 
import CompanyOnboardingIndex from "./clientonboarding";
import CompanyDetailsIndex from "./clientonboarding/companydetails/index";
import CompanyCategoryIndex from "./master/companycategory/index";
import SubscriptionIndex from "../components/subscription";
import AddSubscription from "./subscription/addsubscription";
import AddCompanyCategory from "./master/companycategory/addcompanycategory";
import { injectStyle } from "react-toastify/dist/inject-style";
import RoleListIndex from "./roles/index";
import RoleAddEditIndex from "./roles/addeditrole";
import UserListIndex from "./user/index";
import Notice from "./notices/index";
import AddEditNotice from "./notices/addEditNotice";
import WorkflowList from "./notices/attachment/WorkflowList";
import CounterPartyIndex from "./counterparty/index";
import WorkflowAcc  from "./workflowmasternew/index";
import AddEditWorkflow from "./workflowmasternew/addEditWorkflow/index";
import TemplateAcc  from "./templatemaster/index";
import AddEditTemplateIndex from "./templatemaster/addEditTemplate.js";
import CompanyIndex from "./company/index";
import TypeOfDocumentIndex from "./typeOfDocument/index";
import AdvocateIndex from "./advocatemaster/index";
import CaseTypeIndex from "./casetype/index";
import DepartmentIndex from "./department/index";
import CatOfNoticeIndex from "./categoryofnotice/index";
import CatOfBookAppIndex from "./categoryofBookApp/index";
import StatusOfNoticeIndex from "./statusofnotice/index";
import StatusOfBookAppIndex from "./statusofBookApp/index";
import CourtIndex from "./court/index";
import CauseListIndex from "./dailycauselist/index";
import NatureofWorkIndex from "./natureofwork/index";
import FeeMasterIndex from "./feemaster/index";
import MyEntitiesIndex from "./myentities/index";
import ProActiveIndex from "./proactivealerts/index";
import ProActiveAlerts from "./proactivealerts/proactivealertform.js";
import CourtTypeIndex from "./courttype/index";
import UserAddEdit from "./user/addedituser";
import FormAddEdit from "./forms/index";
import TaskIndex from "./taskmodule/index";
import ContactIndex from "./contactmodule/index";
import TotalSpendIndex from "./TotalSpend/index.js";
import AddDelegate from "./delegate/adddelegate.js";
// import Boardcommiteecomposition from "./boardcommiteecomposition/index";

import UserPermissionIndex from "./permission/user/userpermissionmodel";
import PermissionRoleIndex from "./permission/role/addeditrolepermission";

import ApprovalComment from "./outsider/approval";
import Thankyou from "./outsider/thankyou";


import ProfileIndex from "./profile/index";

import Error from "./error";
import ProtectedRoute from "./auth/privateroute";
import PublicRoute from "./auth/publicroute";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

const ErrorPage = ({ error, resetErrorBoundary }) => {
    console.log('Error occured', error);
    return (
      <div className='error-page'>
        {/* <img src={NotFoundImage} alt='Page not found' /> */}
        <Error/>
        <p className='error-msg'>
          Something went wrong. Try clicking the refresh page button to reload the
          application.{' '}
          <button className='btn' onClick={resetErrorBoundary}>
            Refresh page
          </button>
        </p>
      </div>
    );
  };


if (typeof window !== "undefined") {
    injectStyle();
}


function Main() {
    return (
        <>

            <BrowserRouter>
            <ErrorBoundary
            // FallbackComponent={ErrorPage}
            // onReset={() => (location.href = '/')}
            >
                <HeaderIndex />
                <ToastContainer />
                <YellowBorderBottom />
                <div className="App">
                    <Routes>
                        <Route path="/"
                            element={<LoginIndex />}
                        />
                        <Route
                            path="/thank_you"
                            element={<Thankyou />}
                        />
                        <Route path="/loginpage"
                            element={<LoginIndex />}
                        />
                        <Route path="/forgotpassword"
                            element={<ForgotPasswordIndex />}
                        />
                        <Route path="/logout"
                            element={<LogoutIndex />}
                        />
                        <Route path="/dashboard"
                            element={<ProtectedRoute> <DashBoardIndex /> </ProtectedRoute>}
                        />
                        <Route path="/companyselect"
                            element={<ProtectedRoute> <CompanySelectIndex /> </ProtectedRoute>}
                        />

                        <Route path="/subscription"
                            element={<ProtectedRoute> <SubscriptionIndex /> </ProtectedRoute>}
                        />
                        <Route path="/subscription/addsubscription"
                            element={<ProtectedRoute> <AddSubscription /> </ProtectedRoute>}
                        />
                        <Route path="/subscription/addeditsubscription/:sub_id"
                            element={<ProtectedRoute> <AddSubscription /> </ProtectedRoute>}
                        />
                        <Route path="/clientonboarding"
                            element={<ProtectedRoute> <CompanyOnboardingIndex /> </ProtectedRoute>}
                        />
                        <Route path="/master/companycategory"
                            element={<ProtectedRoute> <CompanyCategoryIndex /> </ProtectedRoute>}
                        />
                        <Route path="/master/addcompanycategory"
                            element={<ProtectedRoute> <AddCompanyCategory /> </ProtectedRoute>}
                        />
                        <Route path="/clientonboarding/companydetails"
                            element={<ProtectedRoute> <CompanyDetailsIndex /> </ProtectedRoute>}
                        />
                        <Route path="/clientonboarding/companydetails/edit/:company_id"
                            element={<ProtectedRoute> <CompanyDetailsIndex /> </ProtectedRoute>}
                        />
                        <Route path="/workflow"
                            element={<ProtectedRoute
                            functionname="getCurdPermission"
                            page="Workflow"
                            keyname="View"
                            > <WorkflowAcc /> </ProtectedRoute>}
                        />
                        <Route path="/addeditworkflow"
                            element={<ProtectedRoute 
                                functionname="getCurdPermission"
                                page="Workflow"
                                keyname="Add"> <AddEditWorkflow /> </ProtectedRoute>}
                        />
                        <Route path="/addeditworkflow/:parmId"
                            element={<ProtectedRoute 
                            functionname="getCurdPermission"
                            page="Workflow"
                            keyname="Edit"> <AddEditWorkflow /> </ProtectedRoute>}
                        />
                        <Route path="/template"
                            element={<ProtectedRoute> <TemplateAcc /> </ProtectedRoute>}
                        />
                        <Route path="/add_template"
                            element={<ProtectedRoute> <AddEditTemplateIndex /> </ProtectedRoute>}
                        />
                        <Route path="/add_template/:tempid"
                            element={<ProtectedRoute> <AddEditTemplateIndex /> </ProtectedRoute>}
                        />
                        <Route path="/userlist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Users"
                                keyname="View"> <UserListIndex /> </ProtectedRoute>}
                        />
                        <Route path="/counterpartylist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Counter Party"
                                keyname="View"> <CounterPartyIndex /> </ProtectedRoute>}
                        />
                        <Route path="/companylist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Company"
                                keyname="View"> <CompanyIndex /> </ProtectedRoute>}
                        />
                        <Route path="/advocatelist"
                            element={<ProtectedRoute> <AdvocateIndex /> </ProtectedRoute>}
                        />
                        <Route path="/casetypelist"
                            element={<ProtectedRoute> <CaseTypeIndex /> </ProtectedRoute>}
                        />
                        <Route path="/dailycauselist"
                            element={<ProtectedRoute> <CauseListIndex /> </ProtectedRoute>}
                        />
                        <Route path="/natureofworklist"
                            element={<ProtectedRoute> <NatureofWorkIndex /> </ProtectedRoute>}
                        />
                        <Route path="/feemasterlist"
                            element={<ProtectedRoute> <FeeMasterIndex /> </ProtectedRoute>}
                        />
                        <Route path="/myentitieslist"
                            element={<ProtectedRoute> <MyEntitiesIndex /> </ProtectedRoute>}
                        />
                        <Route path="/dailycauselist/:filter_type"
                            element={<ProtectedRoute> <CauseListIndex /> </ProtectedRoute>}
                        />
                        <Route path="/proactivealerts"
                            element={<ProtectedRoute> <ProActiveIndex /> </ProtectedRoute>}
                        />
                        
                        <Route path="/proactivealerts/form"
                            element={<ProtectedRoute> <ProActiveAlerts /> </ProtectedRoute>}
                        />
                        <Route path="/typeofdocument"
                            element={<ProtectedRoute> <TypeOfDocumentIndex /> </ProtectedRoute>}
                        />
                        <Route path="/departmentlist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Department"
                                keyname="View"> <DepartmentIndex /> </ProtectedRoute>}
                        />
                        <Route path="/categoryofnoticelist"
                            element={<ProtectedRoute
                            functionname="getCurdPermission"
                                page="Category Of Notice"
                                keyname="View"> <CatOfNoticeIndex /> </ProtectedRoute>}
                        />
                        <Route path="/categoryofBookApplist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Category Of BookApp"
                                keyname="View"> <CatOfBookAppIndex /> </ProtectedRoute>}
                        />
                        <Route path="/statusofnoticelist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Status Of Notice"
                                keyname="View"> <StatusOfNoticeIndex /> </ProtectedRoute>}
                        />
                        <Route path="/statusofBookApplist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Status Of BookApp"
                                keyname="View"> <StatusOfBookAppIndex /> </ProtectedRoute>}
                        />
                        <Route path="/courtlist"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Court"
                                keyname="View"> <CourtIndex /> </ProtectedRoute>}
                        />
                        <Route path="/typeofcourt"
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Court Type"
                                keyname="View"> <CourtTypeIndex /> </ProtectedRoute>}
                        />
                        <Route path="/user/addedituser"
                            element={<ProtectedRoute> <UserAddEdit /> </ProtectedRoute>}
                        />
                        <Route path="/user/addedituser/:user_id"
                            element={<ProtectedRoute> <UserAddEdit /> </ProtectedRoute>}
                        />

                       
                        <Route path="/assignpermissiontouser/:user_id"
                            element={<ProtectedRoute
                                functionname="getKeywisePermission"
                                page="User Permission"
                                > <UserPermissionIndex /> </ProtectedRoute>}
                        />
                        {/* <Route path="/rolelist"
                            element={<ProtectedRoute> <RoleListIndex /> </ProtectedRoute>}
                        />
                        <Route path="/role/addrole"
                            element={<ProtectedRoute> <RoleAddEditIndex /> </ProtectedRoute>}
                        />
                        <Route path="permission/permissionrole/:role_id"
                            element={<ProtectedRoute> <PermissionRoleIndex /> </ProtectedRoute>}
                        />
                        <Route path="/profile"
                            element={<ProtectedRoute> <ProfileIndex /> </ProtectedRoute>}
                        /> */}
                        <Route path="/form/:type_of_request"
                            element={<ProtectedRoute> <FormAddEdit /> </ProtectedRoute>}
                        />
                        <Route path="/form/:type_of_request/:request_id"
                            element={<ProtectedRoute> <FormAddEdit /> </ProtectedRoute>}
                        />
                        <Route path="/report/task"
                            element={<ProtectedRoute> <TaskIndex /> </ProtectedRoute>}
                            exact
                        />
                        <Route path="/report/contact"
                            element={<ProtectedRoute> <ContactIndex /> </ProtectedRoute>}
                            exact
                        />
                        <Route path="/report/totalSpend"
                            element={<ProtectedRoute> <TotalSpendIndex /> </ProtectedRoute>}
                            exact
                        />
                        
                        <Route path="/report/totalSpend/:filter_type"
                            element={<ProtectedRoute> <TotalSpendIndex /> </ProtectedRoute>}
                            exact
                        />
                        <Route path="/report/task/:request_type/:filter_type/:filter_value"
                            element={<ProtectedRoute> <TaskIndex /> </ProtectedRoute>}
                            exact
                        />
                        <Route path="/report/task/:filter_type/:filter_value"
                            element={<ProtectedRoute> <TaskIndex /> </ProtectedRoute>}
                            exact
                        />

                        
                        <Route path="/report/request/:request_type/:filter_type"
                            element={<ProtectedRoute> <Notice /></ProtectedRoute>}
                            exact
                        />

                        <Route path="/report/request/:request_type/:filter_type/:filter_value"
                            element={<ProtectedRoute> <Notice /></ProtectedRoute>}
                            exact
                        />

                        <Route path="/BookApp/couselist"
                            element={<ProtectedRoute> <Notice /></ProtectedRoute>}
                            exact
                        />
                        <Route path="/request/:request_type"
                            exact
                            element={<ProtectedRoute
                                // functionname="getCurdPermission"
                                // page="Notice"
                                // keyname="View"
                                > <Notice /> </ProtectedRoute>}
                        />
                        <Route path="/request/:request_type/:casesummary?"
                            exact
                            element={<ProtectedRoute
                                // functionname="getCurdPermission"
                                // page="Notice"
                                // keyname="View"
                                > <Notice /> </ProtectedRoute>}
                        />
                        {/* <Route path="/boardcommiteecomposition"
                            exact
                            element={<ProtectedRoute> <Boardcommiteecomposition /> </ProtectedRoute>}
                        /> */}
                        <Route path="/:request_type/addNotice"
                            exact
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Notice"
                                keyname="Add"> <AddEditNotice /> </ProtectedRoute>}
                        />
                        <Route path="/:request_type/editNotice/:notice_id"
                            exact
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Notice"
                                keyname="Edit"> <AddEditNotice /> </ProtectedRoute>}
                        />
                        <Route path="/:request_type/editNotice/:notice_id/:tabName"
                            exact
                            element={<ProtectedRoute
                                functionname="getCurdPermission"
                                page="Notice"
                                keyname="Edit"> <AddEditNotice /> </ProtectedRoute>}
                        />
                        <Route path="/workflow/:notice_id/:attachment_id"
                            exact
                            element={<ProtectedRoute> <WorkflowList /> </ProtectedRoute>}
                        />

                        <Route path="/delegate"
                            element={<ProtectedRoute
                                functionname="getKeywisePermission"
                                page="Delegate"
                                > <AddDelegate /> </ProtectedRoute>}
                        />

                        <Route path="/approval_check/:wfruid/:requestor_id/:approver_id/:sender_id/:status"
                            element={<ApprovalComment />}
                        />

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </ErrorBoundary>
            </BrowserRouter>
        </>
    );
}

export default Main;

if (document.getElementById("main")) {
    const Index = ReactDOM.createRoot(document.getElementById("main"));
    Index.render(
        <Main />
    );
}
