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
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Memoize country list to prevent unnecessary re-renders
  const countryList = useMemo(() => getCountryList(), []);

  // State for dropdown visibility and search
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ref for dropdown container to handle outside clicks
  const dropdownRef = useRef(null);

  // State for country with default set to the first country in the list
  const [country, setCountry] = useState(() => {
    // Try to use the initial country from the list, default to first if not found
    const initialCountry =
      countryList.find((c) => c.code === "US") || countryList[0];
    return initialCountry.code;
  });

  // Find country by code or dial code
  const findCountry = useCallback(
    (input) => {
      // Try to find by country code
      let foundCountry = countryList.find((c) => c.code === input);

      // If not found, try to find by dial code
      if (!foundCountry) {
        foundCountry = countryList.find((c) => input.startsWith(c.dialCode));
      }

      return foundCountry ? foundCountry.code : countryList[0].code;
    },
    [countryList]
  );

  // Handle outside click to close dropdown
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

    // Clear specific error when input becomes valid
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
      phone: value || "",
    }));

    // Try to auto-detect country from phone number
    try {
      if (value) {
        const detectedCountry = findCountry(value);
        setCountry(detectedCountry);
      }
    } catch (error) {
      console.log("Phone number parsing error:", error);
    }

    // Clear phone error if the new value is valid
    if (errors.phone) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  const handleCountryChange = (selectedCountry) => {
    console.log("Selected Country:", selectedCountry);
    setCountry(selectedCountry || countryList[0].code);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  // Get the current country details
  const currentCountryDetails = useMemo(() => {
    return countryList.find((c) => c.code === country) || countryList[0];
  }, [country, countryList]);

  // Filtered countries based on search term
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

    // Validation rules
    const validationRules = {
      name: {
        required: true,
        message: "Name is required",
      },
      email: {
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
      phone: {
        required: true,
        validate: (value) => {
          // Check if the phone number is valid using libphonenumber-js
          return value && isValidPhoneNumber(value);
        },
        message: "Please enter a valid international phone number",
      },
      company: {
        required: true,
        message: "Company is required",
      },
      message: {
        required: true,
        message: "Message is required",
      },
    };

    // Validate each field
    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      const value = formData[field].trim();

      // Check if field is required
      if (rule.required && !value) {
        newErrors[field] = rule.message;
      }
      // Custom validation for phone number
      else if (field === "phone" && value) {
        if (!rule.validate(formData.phone)) {
          newErrors[field] = rule.message;
        }
      }
      // Check regex if it exists and value is not empty
      else if (rule.regex && value && !rule.regex.test(value)) {
        newErrors[field] = rule.message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      // Here you would typically send the form data to a backend service
      alert("Form submitted successfully!");
    } else {
      console.log("Form has errors");
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        id="name"
                        placeholder="John Carter"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        placeholder="john@carter.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
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
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div
                            className="input-group-text p-0 position-relative"
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          id="phone"
                          placeholder={`${currentCountryDetails.dialCode} Phone Number`}
                        />
                      </div>
                      {isDropdownOpen && (
                        <div
                          className="dropdown-menu show position-absolute"
                          style={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            width: "100%",
                            zIndex: 1000,
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
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.company ? "is-invalid" : ""
                        }`}
                        id="company"
                        placeholder="Facebook"
                        value={formData.company}
                        onChange={handleChange}
                      />
                      {errors.company && (
                        <div className="invalid-feedback">{errors.company}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                  <label htmlFor="message">Leave us a message</label>
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    id="message"
                    placeholder="Please type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
