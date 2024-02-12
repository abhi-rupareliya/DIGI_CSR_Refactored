const {
  CompanySignup,
  VerifyCompany,
} = require("../Controllers/auth.company");
const { NGOSignup, VerifyNGO } = require("../Controllers/auth.ngo");
const {
  CompanyLogin,
  CompanyLoginVerify,
} = require("../Controllers/auth.company");
const {
  NGOLogin,
  NGOLoginVerify,
} = require("../Controllers/auth.ngo");
const {
  BeneficiarySignup,
  VerifyBeneficiary,
} = require("../Controllers/beneficiary.controller");
const {
  BeneficiaryLogin,
  BeneficiaryLoginVerify,
} = require("../Controllers/beneficiary.controller");
const { AdminLogin, AdminLoginVerify } = require("../Controllers/auth.admin");

const AuthRoutes = (app) => {
  app.post("/company/signup", CompanySignup);
  app.post("/company/verify", VerifyCompany);
  app.post("/ngo/signup", NGOSignup);
  app.post("/ngo/verify", VerifyNGO);
  app.post("/company/login", CompanyLogin); //done
  app.post("/company/login/verify", CompanyLoginVerify); //done
  app.post("/NGO/login", NGOLogin); //done
  app.post("/NGO/login/verify", NGOLoginVerify); //donr
  app.post("/Beneficiary/signup", BeneficiarySignup);
  app.post("/Beneficiary/verify", VerifyBeneficiary);
  app.post("/Beneficiary/login", BeneficiaryLogin);
  app.post("/Beneficiary/login/verify", BeneficiaryLoginVerify);
  app.post("/admin/login/", AdminLogin);
  app.post("/admin/login/verify", AdminLoginVerify);
};
module.exports = AuthRoutes;
