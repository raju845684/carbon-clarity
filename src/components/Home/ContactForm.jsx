import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.min.json";
import en from "react-phone-number-input/locale/en.json";
import "flag-icons/css/flag-icons.min.css";

// Comprehensive list of country codes with names and dial codes
const getCountryList = () => {
  return [
    { code: "US", name: "USA", dialCode: "+1" },
    { code: "CA", name: "Canada", dialCode: "+1" },
    { code: "GB", name: "United Kingdom", dialCode: "+44" },
    { code: "AU", name: "Australia", dialCode: "+61" },
    { code: "DE", name: "Germany", dialCode: "+49" },
    { code: "FR", name: "France", dialCode: "+33" },
    { code: "JP", name: "Japan", dialCode: "+81" },
    { code: "CN", name: "China", dialCode: "+86" },
    { code: "IN", name: "India", dialCode: "+91" },
    { code: "BR", name: "Brazil", dialCode: "+55" },
    { code: "RU", name: "Russia", dialCode: "+7" },
    { code: "IT", name: "Italy", dialCode: "+39" },
    { code: "ES", name: "Spain", dialCode: "+34" },
    { code: "NL", name: "Netherlands", dialCode: "+31" },
    { code: "KR", name: "South Korea", dialCode: "+82" },
    { code: "MX", name: "Mexico", dialCode: "+52" },
    { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
    { code: "TR", name: "Turkey", dialCode: "+90" },
    { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
    { code: "SG", name: "Singapore", dialCode: "+65" },
    { code: "CH", name: "Switzerland", dialCode: "+41" },
    { code: "SE", name: "Sweden", dialCode: "+46" },
    { code: "NO", name: "Norway", dialCode: "+47" },
    { code: "DK", name: "Denmark", dialCode: "+45" },
    { code: "FI", name: "Finland", dialCode: "+358" },
    { code: "PL", name: "Poland", dialCode: "+48" },
    { code: "CZ", name: "Czech Republic", dialCode: "+420" },
    { code: "AT", name: "Austria", dialCode: "+43" },
    { code: "GR", name: "Greece", dialCode: "+30" },
    { code: "PT", name: "Portugal", dialCode: "+351" },
    { code: "BE", name: "Belgium", dialCode: "+32" },
    { code: "IE", name: "Ireland", dialCode: "+353" },
    { code: "NZ", name: "New Zealand", dialCode: "+64" },
    { code: "IL", name: "Israel", dialCode: "+972" },
    { code: "HK", name: "Hong Kong", dialCode: "+852" },
    { code: "MY", name: "Malaysia", dialCode: "+60" },
    { code: "TH", name: "Thailand", dialCode: "+66" },
    { code: "ID", name: "Indonesia", dialCode: "+62" },
    { code: "PH", name: "Philippines", dialCode: "+63" },
    { code: "AD", name: "Andorra", dialCode: "+376" },
    { code: "AO", name: "Angola", dialCode: "+244" },
    { code: "AI", name: "Anguilla", dialCode: "+1264" },
    { code: "AG", name: "Antigua and Barbuda", dialCode: "+1268" },
    { code: "AR", name: "Argentina", dialCode: "+54" },
    { code: "AM", name: "Armenia", dialCode: "+374" },
    { code: "AW", name: "Aruba", dialCode: "+297" },
    { code: "BH", name: "Bahrain", dialCode: "+973" },
    { code: "BD", name: "Bangladesh", dialCode: "+880" },
    { code: "BB", name: "Barbados", dialCode: "+1246" },
    { code: "BY", name: "Belarus", dialCode: "+375" },
    { code: "BZ", name: "Belize", dialCode: "+501" },
    { code: "BJ", name: "Benin", dialCode: "+229" },
    { code: "BM", name: "Bermuda", dialCode: "+1441" },
    { code: "BT", name: "Bhutan", dialCode: "+975" },
    { code: "BO", name: "Bolivia", dialCode: "+591" },
    { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387" },
    { code: "BW", name: "Botswana", dialCode: "+267" },
    { code: "IO", name: "British Indian Ocean Territory", dialCode: "+246" },
    { code: "BN", name: "Brunei", dialCode: "+673" },
    { code: "BG", name: "Bulgaria", dialCode: "+359" },
    { code: "BF", name: "Burkina Faso", dialCode: "+226" },
    { code: "BI", name: "Burundi", dialCode: "+257" },
    { code: "KH", name: "Cambodia", dialCode: "+855" },
    { code: "CM", name: "Cameroon", dialCode: "+237" },
    { code: "CV", name: "Cape Verde", dialCode: "+238" },
    { code: "KY", name: "Cayman Islands", dialCode: "+1345" },
    { code: "CF", name: "Central African Republic", dialCode: "+236" },
    { code: "TD", name: "Chad", dialCode: "+235" },
    { code: "CL", name: "Chile", dialCode: "+56" },
    { code: "CO", name: "Colombia", dialCode: "+57" },
    { code: "KM", name: "Comoros", dialCode: "+269" },
    { code: "CG", name: "Congo", dialCode: "+242" },
    { code: "CR", name: "Costa Rica", dialCode: "+506" },
    { code: "HR", name: "Croatia", dialCode: "+385" },
    { code: "CU", name: "Cuba", dialCode: "+53" },
    { code: "CY", name: "Cyprus", dialCode: "+357" },
    { code: "DO", name: "Dominican Republic", dialCode: "+1809" },
    { code: "EC", name: "Ecuador", dialCode: "+593" },
    { code: "SV", name: "El Salvador", dialCode: "+503" },
    { code: "GQ", name: "Equatorial Guinea", dialCode: "+240" },
    { code: "ER", name: "Eritrea", dialCode: "+291" },
    { code: "EE", name: "Estonia", dialCode: "+372" },
    { code: "ET", name: "Ethiopia", dialCode: "+251" },
    { code: "FJ", name: "Fiji", dialCode: "+679" },
    { code: "GA", name: "Gabon", dialCode: "+241" },
    { code: "GM", name: "Gambia", dialCode: "+220" },
    { code: "GE", name: "Georgia", dialCode: "+995" },
    { code: "GH", name: "Ghana", dialCode: "+233" },
    { code: "GD", name: "Grenada", dialCode: "+1473" },
    { code: "GU", name: "Guam", dialCode: "+1671" },
    { code: "GT", name: "Guatemala", dialCode: "+502" },
    { code: "GN", name: "Guinea", dialCode: "+224" },
    { code: "GW", name: "Guinea-Bissau", dialCode: "+245" },
    { code: "GY", name: "Guyana", dialCode: "+592" },
    { code: "HT", name: "Haiti", dialCode: "+509" },
    { code: "HN", name: "Honduras", dialCode: "+504" },
    { code: "HU", name: "Hungary", dialCode: "+36" },
    { code: "IS", name: "Iceland", dialCode: "+354" },
    { code: "IQ", name: "Iraq", dialCode: "+964" },
    { code: "JM", name: "Jamaica", dialCode: "+1876" },
    { code: "JO", name: "Jordan", dialCode: "+962" },
    { code: "KZ", name: "Kazakhstan", dialCode: "+7" },
    { code: "KE", name: "Kenya", dialCode: "+254" },
    { code: "KI", name: "Kiribati", dialCode: "+686" },
    { code: "XK", name: "Kosovo", dialCode: "+383" },
    { code: "KW", name: "Kuwait", dialCode: "+965" },
    { code: "KG", name: "Kyrgyzstan", dialCode: "+996" },
    { code: "LA", name: "Laos", dialCode: "+856" },
    { code: "LV", name: "Latvia", dialCode: "+371" },
    { code: "LB", name: "Lebanon", dialCode: "+961" },
    { code: "LS", name: "Lesotho", dialCode: "+266" },
    { code: "LR", name: "Liberia", dialCode: "+231" },
    { code: "LY", name: "Libya", dialCode: "+218" },
    { code: "LI", name: "Liechtenstein", dialCode: "+423" },
    { code: "LT", name: "Lithuania", dialCode: "+370" },
    { code: "LU", name: "Luxembourg", dialCode: "+352" },
    { code: "MG", name: "Madagascar", dialCode: "+261" },
    { code: "MW", name: "Malawi", dialCode: "+265" },
    { code: "MV", name: "Maldives", dialCode: "+960" },
    { code: "ML", name: "Mali", dialCode: "+223" },
    { code: "MT", name: "Malta", dialCode: "+356" },
    { code: "MH", name: "Marshall Islands", dialCode: "+692" },
    { code: "MR", name: "Mauritania", dialCode: "+222" },
    { code: "MU", name: "Mauritius", dialCode: "+230" },
    { code: "FM", name: "Micronesia", dialCode: "+691" },
    { code: "MD", name: "Moldova", dialCode: "+373" },
    { code: "MC", name: "Monaco", dialCode: "+377" },
    { code: "MN", name: "Mongolia", dialCode: "+976" },
    { code: "ME", name: "Montenegro", dialCode: "+382" },
    { code: "MS", name: "Montserrat", dialCode: "+1664" },
    { code: "MA", name: "Morocco", dialCode: "+212" },
    { code: "MZ", name: "Mozambique", dialCode: "+258" },
    { code: "MM", name: "Myanmar", dialCode: "+95" },
    { code: "NA", name: "Namibia", dialCode: "+264" },
    { code: "NR", name: "Nauru", dialCode: "+674" },
    { code: "NP", name: "Nepal", dialCode: "+977" },
    { code: "NC", name: "New Caledonia", dialCode: "+687" },
    { code: "NI", name: "Nicaragua", dialCode: "+505" },
    { code: "NE", name: "Niger", dialCode: "+227" },
    { code: "NG", name: "Nigeria", dialCode: "+234" },
    { code: "NU", name: "Niue", dialCode: "+683" },
    { code: "NF", name: "Norfolk Island", dialCode: "+672" },
    { code: "KP", name: "North Korea", dialCode: "+850" },
    { code: "OM", name: "Oman", dialCode: "+968" },
    { code: "PK", name: "Pakistan", dialCode: "+92" },
    { code: "PW", name: "Palau", dialCode: "+680" },
    { code: "PS", name: "Palestine", dialCode: "+970" },
    { code: "PA", name: "Panama", dialCode: "+507" },
    { code: "PG", name: "Papua New Guinea", dialCode: "+675" },
    { code: "PY", name: "Paraguay", dialCode: "+595" },
    { code: "PE", name: "Peru", dialCode: "+51" },
    { code: "PR", name: "Puerto Rico", dialCode: "+1939" },
    { code: "QA", name: "Qatar", dialCode: "+974" },
    { code: "RO", name: "Romania", dialCode: "+40" },
    { code: "RW", name: "Rwanda", dialCode: "+250" },
    { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1869" },
    { code: "LC", name: "Saint Lucia", dialCode: "+1758" },
    { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1784" },
    { code: "WS", name: "Samoa", dialCode: "+685" },
    { code: "SM", name: "San Marino", dialCode: "+378" },
    { code: "ST", name: "Sao Tome and Principe", dialCode: "+239" },
    { code: "SN", name: "Senegal", dialCode: "+221" },
    { code: "RS", name: "Serbia", dialCode: "+381" },
    { code: "SC", name: "Seychelles", dialCode: "+248" },
    { code: "SL", name: "Sierra Leone", dialCode: "+232" },
    { code: "SI", name: "Slovenia", dialCode: "+386" },
    { code: "SB", name: "Solomon Islands", dialCode: "+677" },
    { code: "SO", name: "Somalia", dialCode: "+252" },
    { code: "ZA", name: "South Africa", dialCode: "+27" },
    { code: "SS", name: "South Sudan", dialCode: "+211" },
    { code: "LK", name: "Sri Lanka", dialCode: "+94" },
    { code: "SD", name: "Sudan", dialCode: "+249" },
    { code: "SR", name: "Suriname", dialCode: "+597" },
    { code: "SZ", name: "Swaziland", dialCode: "+268" },
    { code: "SY", name: "Syria", dialCode: "+963" },
    { code: "TW", name: "Taiwan", dialCode: "+886" },
    { code: "TJ", name: "Tajikistan", dialCode: "+992" },
    { code: "TZ", name: "Tanzania", dialCode: "+255" },
    { code: "TG", name: "Togo", dialCode: "+228" },
    { code: "TO", name: "Tonga", dialCode: "+676" },
    { code: "TT", name: "Trinidad and Tobago", dialCode: "+1868" },
    { code: "TN", name: "Tunisia", dialCode: "+216" },
    { code: "TM", name: "Turkmenistan", dialCode: "+993" },
    { code: "TC", name: "Turks and Caicos Islands", dialCode: "+1649" },
    { code: "TV", name: "Tuvalu", dialCode: "+688" },
    { code: "UG", name: "Uganda", dialCode: "+256" },
    { code: "UA", name: "Ukraine", dialCode: "+380" },
    { code: "UY", name: "Uruguay", dialCode: "+598" },
    { code: "UZ", name: "Uzbekistan", dialCode: "+998" },
    { code: "VU", name: "Vanuatu", dialCode: "+678" },
    { code: "VA", name: "Vatican City", dialCode: "+379" },
    { code: "VE", name: "Venezuela", dialCode: "+58" },
    { code: "VN", name: "Vietnam", dialCode: "+84" },
    { code: "VG", name: "Virgin Islands, British", dialCode: "+1284" },
    { code: "VI", name: "Virgin Islands, U.S.", dialCode: "+1340" },
    { code: "YE", name: "Yemen", dialCode: "+967" },
    { code: "ZM", name: "Zambia", dialCode: "+260" },
    { code: "ZW", name: "Zimbabwe", dialCode: "+263" },
  ].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    description: "",
    cCompany: "",
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const dropdownRef = useRef(null);
  const [country, setCountry] = useState(() => {
    const initialCountry =
      getCountryList().find((c) => c.code === "US") || getCountryList()[0];
    return initialCountry.code;
  });
  const [isCountryManuallySelected, setIsCountryManuallySelected] =
    useState(false);

  const countryList = useMemo(() => getCountryList(), []);

  const findCountry = useCallback(
    (input, currentCountry) => {
      let foundCountry = countryList.find((c) => c.code === input);
      if (!foundCountry && input) {
        // Check if the current country's dial code matches
        const currentCountryDetails = countryList.find(
          (c) => c.code === currentCountry
        );
        if (
          currentCountryDetails &&
          input.startsWith(currentCountryDetails.dialCode)
        ) {
          return currentCountry; // Retain current country if dial code matches
        }
        // Otherwise, find by dial code
        foundCountry = countryList.find((c) => input.startsWith(c.dialCode));
      }
      return foundCountry ? foundCountry.code : countryList[0].code;
    },
    [countryList]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNumber: value || "",
    }));

    if (!isCountryManuallySelected && value) {
      try {
        const detectedCountry = findCountry(value, country);
        setCountry(detectedCountry);
      } catch (error) {
        console.log("Phone number parsing error:", error);
      }
    }

    if (errors.phoneNumber) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.phoneNumber;
        return newErrors;
      });
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry || countryList[0].code);
    setIsCountryManuallySelected(true); // Mark country as manually selected
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const currentCountryDetails = useMemo(() => {
    return countryList.find((c) => c.code === country) || countryList[0];
  }, [country, countryList]);

  const filteredCountries = useMemo(() => {
    return countryList.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.dialCode.includes(searchTerm)
    );
  }, [countryList, searchTerm]);

  const validateForm = () => {
    const newErrors = {};
    const validationRules = {
      firstName: { required: true, message: "First name is required" },
      emailAddress: {
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
      phoneNumber: {
        required: true,
        validate: (value) => value && isValidPhoneNumber(value, metadata),
        message: "Please enter a valid international phone number",
      },
      cCompany: { required: true, message: "Company is required" },
      description: { required: true, message: "Description is required" },
    };

    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      const value = formData[field].trim();
      if (rule.required && !value) {
        newErrors[field] = rule.message;
      } else if (
        field === "phoneNumber" &&
        value &&
        !rule.validate(formData.phoneNumber)
      ) {
        newErrors[field] = rule.message;
      } else if (rule.regex && value && !rule.regex.test(value)) {
        newErrors[field] = rule.message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://admin.carbonclarity.ai/api/v1/LeadCapture/c09d88ece0c2461dcc2c1e9da7213c1b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          emailAddress: "",
          phoneNumber: "",
          description: "",
          cCompany: "",
        });
        setErrors({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message || `Server error: ${response.status}`;
        setSubmitError(errorMessage);
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form" id="request-demo">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-xs-12"></div>
          <div className="col-md-8 col-sm-12 col-xs-12">
            <div className="contact-form-container">
              <h2>Schedule a demo</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
                dolorol egestas morbi sem vulputate etiam facilisis pellentesque
                ut quis.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                          id="firstName"
                          placeholder="John Carter"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="emailAddress">Email</label>
                        <input
                          type="email"
                          className={`form-control ${
                            errors.emailAddress ? "is-invalid" : ""
                          }`}
                          id="emailAddress"
                          placeholder="john@carter.com"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {errors.emailAddress && (
                          <div className="invalid-feedback">
                            {errors.emailAddress}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div
                        className="form-group phone-input-container position-relative"
                        ref={dropdownRef}
                      >
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div
                              className="input-group-text p-0 position-relative"
                              style={{
                                cursor: isSubmitting
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                              onClick={() =>
                                !isSubmitting &&
                                setIsDropdownOpen(!isDropdownOpen)
                              }
                            >
                              <i
                                className={`fi fi-${country.toLowerCase()} m-2`}
                                style={{ width: "24px", height: "18px" }}
                              />
                            </div>
                          </div>
                          <PhoneInput
                            labels={en}
                            countries={countryList.map((c) => c.code)}
                            country={country}
                            international
                            withCountryCallingCode
                            value={formData.phoneNumber}
                            onChange={handlePhoneChange}
                            className={`form-control ${
                              errors.phoneNumber ? "is-invalid" : ""
                            }`}
                            id="phoneNumber"
                            placeholder={`${currentCountryDetails.dialCode} Phone Number`}
                            disabled={isSubmitting}
                          />
                        </div>
                        {isDropdownOpen && !isSubmitting && (
                          <div
                            className="dropdown-menu show position-absolute"
                            style={{
                              maxHeight: "300px",
                              overflowY: "auto",
                              width: "100%",
                              zIndex: 999999,
                            }}
                          >
                            <input
                              type="text"
                              className="form-control mb-2"
                              placeholder="Search countries..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {filteredCountries.map((c) => (
                              <button
                                key={c.code}
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => handleCountryChange(c.code)}
                              >
                                <i
                                  className={`fi fi-${c.code.toLowerCase()} mr-2`}
                                ></i>
                                <span className="ml-auto text-muted">
                                  {c.dialCode}
                                </span>
                                <span className="ml-auto">{c.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {errors.phoneNumber && (
                          <div className="invalid-feedback">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="cCompany">Company</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.cCompany ? "is-invalid" : ""
                          }`}
                          id="cCompany"
                          placeholder="Facebook"
                          value={formData.cCompany}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {errors.cCompany && (
                          <div className="invalid-feedback">
                            {errors.cCompany}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="description">Leave us a message</label>
                    <textarea
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      id="description"
                      placeholder="Please type your message here..."
                      value={formData.description}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="4"
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div className="alert alert-danger" role="alert">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              ) : (
                <div className="success-message text-center py-5">
                  <div className="success-icon mb-4">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        border: "3px solid #28a745",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ color: "#28a745" }}
                      >
                        <path
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3
                    style={{
                      color: "#28a745",
                      marginBottom: "1rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    Form submitted successfully!
                  </h3>
                  <p
                    style={{
                      marginBottom: "1rem",
                      fontWeight: "500",
                      color: "#5e5a87",
                    }}
                  >
                    Thank you! The form has been submitted successfully.
                  </p>
                  <p
                    style={{
                      marginBottom: "2rem",
                      fontWeight: "500",
                      color: "#5e5a87",
                    }}
                  >
                    We will reply to you soon!
                  </p>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setIsSubmitted(false)}
                    style={{
                      color: "#ffffff",
                      borderColor: "#5e5a87",
                      textDecoration: "none",
                      background: "none",
                      border: "1px solid #5e5a87",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: "#5e5a87",
                    }}
                  >
                    Go back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
