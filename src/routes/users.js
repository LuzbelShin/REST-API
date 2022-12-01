const { Router } = require("express");
const router = Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  let users = await User.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const { name, last_name, second_last_name, phone, address, curp, rfc, email_i, email_p, email_personal, admission, profile, study_degree, check_email_i, check_email_p, check_email_personal, } = req.body;
  console.log(req.body);
  console.log(req.params);
  const { id } = req.params;

  const admi = await User.findById(id);

  var firsttime = firstTime(admi);
  var favorite_email = favoriteEmail(email_i, email_p, email_personal, check_email_i, check_email_p, check_email_personal);

  const regexPhone = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const regexAddress = /^[A-Za-z0-9#.-\s]*$/;
  const regexCurp = /[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?/;
  const regexRFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  const regexDate = /^(0?[1-9]|1[0-9]|2[0-4])([\-/])\d{4}$/;

  if (firsttime) {
    if ((!regexCurp.test(curp) || curp === "" || curp === null || regexRFC.test(rfc) || rfc === "" || rfc === null || !regexDate.test(admission) || admission === "" || admission === null) && (!regexPhone.test(phone) || phone === "" || phone === null || !regexAddress.test(address) || address == null || address === "")) {
      res.status(500).json({ error: "Internal server errror" });
    } else {
      if ((req.files.length != 0)) {
        /*const file = req.files.at(0);
              const result = await cloudinary.v2.uploader.upload(file.path);
              const public_id = result.public_id;
              const imageURL = result.secure_url;
  
              await fs.unlink(file.path);
              await User.findByIdAndUpdate(req.params.id, { phone, address, email_i, email_p, email_personal, profile, study_degree, imageURL, public_id, favorite_email, });*/
        res.status(200).json({ mssg: "cambios realizados" });
      } else {
        //await User.findByIdAndUpdate(req.params.id, { phone, address, curp, rfc, email_i, email_p, email_personal, admission, profile, study_degree, favorite_email, }); 
        res.status(200).json({ mssg: "cambios realizados" });
      }
    }
  } else if ((req.files.length != 0)) {
    /*const file = req.files.at(0);
      const result = await cloudinary.v2.uploader.upload(file.path);
      const public_id = result.public_id;
      const imageURL = result.secure_url;

      await User.findByIdAndUpdate(req.params.id, { imageURL, public_id });
      await fs.unlink(file.path);*/
    res.status(200).json({ mssg: "cambios realizados" });
  } else {
    if (!regexPhone.test(phone) || phone === "" || phone === null || !regexAddress.test(address) || address == null || address === "") {
      res.status(500).json({ error: "Internal server errror 3" });
    } else if ((req.files.length != 0)) {
      /*const file = req.files.at(0);
            const result = await cloudinary.v2.uploader.upload(file.path);
            const public_id = result.public_id;
            const imageURL = result.secure_url;

            await fs.unlink(file.path);
            await User.findByIdAndUpdate(req.params.id, { phone, address, email_i, email_p, email_personal, imageURL, public_id, favorite_email, });*/
      res.status(200).json({ mssg: "cambios realizados" });
    } else {
      //await User.findByIdAndUpdate(req.params.id, { phone, address, email_i, email_p, email_personal, favorite_email, });
      res.status(200).json({ mssg: "cambios realizados" });
    }
  }
}
  //await User.findByIdAndUpdate(req.params.id, {    name,    last_name,    second_last_name,    phone,    address,    curp,    rfc,    email_i,    email_p,    email_personal,    admission,    profile,    study_degree,    favorite_email,  });
);

router.get("/users", async (req, res) => {
  let users = await User.find();
  res.json(users);
});

function firstTime(user) {
  if (user.name != null && user.last_name != null && user.second_last_name != null && user.phone == null && user.address == null && user.curp == null && user.rfc == null && user.email_i == null && user.email_p == null && user.email_personal == null && user.admission == null && user.profile == null && user.study_degree == null) {
    return true;
  }
  return false;
}

function favoriteEmail(email_i, email_p, email_personal, check_email_i, check_email_p, check_email_personal) {
  var favorite_email = "";

  if (check_email_i == "on") {
    if (email_i != null && email_i != "") {
      favorite_email = email_i;
    }
  } else if (check_email_p == "on") {
    if (email_p != null && email_p != "") {
      favorite_email = email_p;
    }
  } else if (check_email_personal == "on") {
    if (email_personal != null && email_personal != "") {
      favorite_email = email_personal;
    }
  }
  return favorite_email;
}

module.exports = router;
