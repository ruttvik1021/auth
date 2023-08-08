export const length = {
  orgNameLength: {
    min: 3,
    max: 50,
  },
  name: {
    min: 3,
    max: 50,
  },
  aboutUs: {
    max: 250,
  },
  address: {
    max: 250,
  },
};

export const parameters = {
  organizationName: "organizationName",
  organizationLogo: "organizationLogo",
  name: "name",
  mobileNumber: "mobileNumber",
  industryId: "industryId",
  aboutus: "aboutus",
  email: "email",
  address: "address",
};

export const messages = {
  organizationNameRequired: "Organization Name Required",
  orgNameLength: `Must be between ${length.orgNameLength.min} to ${length.orgNameLength.max}`,
  orgLogoRequired: "Organization Logo Required",
  nameCharacters: "Must have only characters",
  nameLength: `Must be between ${length.name.min} to ${length.name.max}`,
  doubleSpacesNotAllowed: "Double spaces not allowed",
  numbersNotAllowed: "Numbers not allowed",
  nameRequired: "Name Required",
  mobileNumberRequired: "Mobile Number Required",
  industryRequired: "Industry Required",
  aboutUsLength: `Not more than ${length.aboutUs.max} characters`,
  addressLength: `Not more than ${length.address.max} characters`,
  emailRequired: "Email Required",
  addressRequired: "Address Required",

  profileUpdatedSuccessfully: "Profile Updated Successfully",
};
