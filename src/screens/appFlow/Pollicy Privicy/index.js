import { View, Text, Image ,ScrollView,SafeAreaView} from 'react-native'
import React from 'react'
import Header from '../../../components/Headers'
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import { appStyles } from '../../../services/utilities/appStyles'
import { GreenLock, HYlogowhite, Handtea, LeftButton, Logo, Redduck, } from '../../../services/utilities/assets'
import { scale } from 'react-native-size-matters';
import { fontFamily, fontSize } from '../../../services/utilities/fonts';
export default function Index({ navigation }) {
  return (
    <SafeAreaView style={appStyles.container}>
      <Header imageSource={LeftButton}
        headerText='Privacy Policy'
        showImage={true}
        onPress={() => navigation.goBack()}
        customTextMarginLeft={responsiveWidth(24)}
      />
       <ScrollView
        contentContainerStyle={appStyles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
             <Image source={GreenLock} style={appStyles.frame} />
      <View style={appStyles.mainview}>
       <Text style={[appStyles.txtpartner,{lineHeight:scale(18),textAlign:'justify'}]}>
<Text style={appStyles.title}>Privacy Policy{'\n'}</Text>{'\n'}Last updated: November 04, 2023{'\n'}{'\n'}
This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.{'\n'}{'\n'}
<Text style={appStyles.title}>Interpretation and Definitions</Text>{'\n'}{'\n'}
<Text style={appStyles.title}>Interpretation{'\n'}</Text>{'\n'}The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.{'\n'}
<Text style={appStyles.title}>{'\n'}Definitions{'\n'}</Text>{'\n'}
For the purposes of this Privacy Policy:{'\n'}{'\n'}
	•	Account means a unique account created for You to access our Service or parts of our Service.{'\n'}
	•	Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.{'\n'}
	•	Application refers to Harvest Yards, the software program provided by the Company.{'\n'}
	•	Business, for the purpose of CCPA/CPRA, refers to the Company as the legal entity that collects Consumers' personal information and determines the purposes and means of the processing of Consumers' personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers' personal information, that does business in the State of California.{'\n'}
	•	CCPA and/or CPRA refers to the California Consumer Privacy Act (the "CCPA") as amended by the California Privacy Rights Act of 2020 (the "CPRA").{'\n'}
	•	Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Knot for Profit, 8549 Wilshire Blvd., #2021, Beverly Hills, CA 90211.{'\n'}
	•	Consumer, for the purpose of the CCPA/CPRA, means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.{'\n'}
	•	Country refers to: California, United States{'\n'}
	•	Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.{'\n'}
	•	Do Not Track (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.{'\n'}
	•	Personal Data is any information that relates to an identified or identifiable individual. For the purposes of the CCPA/CPRA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.{'\n'}
	•	Service refers to the Application.{'\n'}
	•	Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.{'\n'}
	•	Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).{'\n'}
	•	You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.{'\n'}{'\n'}
  <Text style={appStyles.title}>Collecting and Using Your Personal Data</Text>{'\n'}{'\n'}
  <Text style={appStyles.title}>Types of Data Collected</Text>{'\n'}{'\n'}
  <Text style={appStyles.title}>Personal Data</Text>{'\n'}{'\n'}
While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:{'\n'}{'\n'}
	•	Email address{'\n'}
	•	First name and last name{'\n'}
	•	Phone number{'\n'}
	•	Address, State, Province, ZIP/Postal code, City{'\n'}
	•	Usage Data{'\n'}{'\n'}
  <Text style={appStyles.title}>Usage Data</Text>{'\n'}{'\n'}
Usage Data is collected automatically when using the Service.{'\n'}{'\n'}
Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.{'\n'}{'\n'}
When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.{'\n'}{'\n'}
We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.{'\n'}{'\n'}
<Text style={appStyles.title}>Information Collected while Using the Application</Text>{'\n'}{'\n'}
While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:{'\n'}{'\n'}{'\n'}
	•	Information regarding your location{'\n'}{'\n'}
We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company's servers and/or a Service Provider's server or it may be simply stored on Your device.{'\n'}{'\n'}
You can enable or disable access to this information at any time, through Your Device settings.{'\n'}{'\n'}
<Text style={appStyles.title}>Use of Your Personal Data</Text>{'\n'}{'\n'}
The Company may use Personal Data for the following purposes:{'\n'}{'\n'}
	•	To provide and maintain our Service, including to monitor the usage of our Service.{'\n'}
	•	To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.{'\n'}
	•	For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.{'\n'}
	•	To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.{'\n'}
	•	To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.{'\n'}
	•	To manage Your requests: To attend and manage Your requests to Us.{'\n'}
	•	For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.{'\n'}
	•	For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.{'\n'}{'\n'}
We may share Your personal information in the following situations:{'\n'}{'\n'}
	•	With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.{'\n'}
	•	For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.{'\n'}
	•	With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.{'\n'}
	•	With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.{'\n'}
	•	With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.{'\n'}
	•	With Your consent: We may disclose Your personal information for any other purpose with Your consent.{'\n'}{'\n'}
  <Text style={appStyles.title}>Retention of Your Personal Data</Text>{'\n'}{'\n'}
The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.{'\n'}{'\n'}
The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.{'\n'}{'\n'}
<Text style={appStyles.title}>Transfer of Your Personal Data</Text>{'\n'}{'\n'}
Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.{'\n'}{'\n'}
Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.{'\n'}{'\n'}
The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.{'\n'}{'\n'}
<Text style={appStyles.title}>Delete Your Personal Data</Text>{'\n'}{'\n'}
You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.{'\n'}{'\n'}
Our Service may give You the ability to delete certain information about You from within the Service.{'\n'}{'\n'}
You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.{'\n'}{'\n'}
Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.{'\n'}{'\n'}
<Text style={appStyles.title}>Disclosure of Your Personal Data</Text>{'\n'}{'\n'}
<Text style={appStyles.title}>Business Transactions</Text>{'\n'}{'\n'}
If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.{'\n'}{'\n'}
<Text style={appStyles.title}>Law enforcement</Text>{'\n'}{'\n'}
Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).{'\n'}{'\n'}
<Text style={appStyles.title}>Other legal requirements</Text>{'\n'}{'\n'}
The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:{'\n'}{'\n'}
	•	Comply with a legal obligation{'\n'}
	•	Protect and defend the rights or property of the Company{'\n'}
	•	Prevent or investigate possible wrongdoing in connection with the Service{'\n'}
	•	Protect the personal safety of Users of the Service or the public{'\n'}
	•	Protect against legal liability{'\n'}{'\n'}
  <Text style={appStyles.title}>Security of Your Personal Data</Text>{'\n'}{'\n'}
The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.{'\n'}{'\n'}
<Text style={appStyles.title}>CCPA/CPRA Privacy Notice</Text>{'\n'}{'\n'}
This privacy notice section for California residents supplements the information contained in Our Privacy Policy and it applies solely to all visitors, users, and others who reside in the State of California.{'\n'}{'\n'}
<Text style={appStyles.title}>Categories of Personal Information Collected</Text>{'\n'}{'\n'}
We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular Consumer or Device. The following is a list of categories of personal information which we may collect or may have been collected from California residents within the last twelve (12) months.{'\n'}{'\n'}
Please note that the categories and examples provided in the list below are those defined in the CCPA/CPRA. This does not mean that all examples of that category of personal information were in fact collected by Us, but reflects our good faith belief to the best of Our knowledge that some of that information from the applicable category may be and may have been collected. For example, certain categories of personal information would only be collected if You provided such personal information directly to Us.{'\n'}{'\n'}
	•	Category A: Identifiers.{'\n'}Examples: A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, driver's license number, passport number, or other similar identifiers.{'\n'}Collected: Yes.{'\n'}{'\n'}
	•	Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).{'\n'}Examples: A name, signature, Social Security number, physical characteristics or description, address, telephone number, passport number, driver's license or state identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information. Some personal information included in this category may overlap with other categories.{'\n'}Collected: Yes.{'\n'}
	•	Category C: Protected classification characteristics under California or federal law.{'\n'}Examples: Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).{'\n'}Collected: No.{'\n'}
	•	Category D: Commercial information.{'\n'}Examples: Records and history of products or services purchased or considered.{'\n'}Collected: No.{'\n'}
	•	Category E: Biometric information.{'\n'}Examples: Genetic, physiological, behavioral, and biological characteristics, or activity patterns used to extract a template or other identifier or identifying information, such as, fingerprints, faceprints, and voiceprints, iris or retina scans, keystroke, gait, or other physical patterns, and sleep, health, or exercise data.{'\n'}Collected: No.
	•	Category F: Internet or other similar network activity.{'\n'}Examples: Interaction with our Service or advertisement.{'\n'}Collected: Yes.
	•	Category G: Geolocation data.{'\n'}Examples: Approximate physical location.{'\n'}Collected: Yes.{'\n'}
  •	Category H: Sensory data.{'\n'}Examples: Audio, electronic, visual, thermal, olfactory, or similar information.{'\n'}Collected: No.{'\n'}
  •	Category I: Professional or employment-related information.{'\n'}Examples: Current or past job history or performance evaluations.{'\n'}Collected: No.{'\n'}
  •	Category J: Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).{'\n'}Examples: Education records directly related to a student maintained by an educational institution or party acting on its behalf, such as grades, transcripts, class lists, student schedules, student identification codes, student financial information, or student disciplinary records.{'\n'}Collected: No.{'\n'}
  •	Category K: Inferences drawn from other personal information.{'\n'}Examples: Profile reflecting a person's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.{'\n'}Collected: No.{'\n'}
  •	Category L: Sensitive personal information.{'\n'}Examples: Account login and password information, geolocation data.{'\n'}Collected: Yes.{'\n'}{'\n'}
  <Text style={appStyles.title}>Under CCPA/CPRA, personal information does not include:</Text>{'\n'}{'\n'}
	•	Publicly available information from government records{'\n'}
	•	Deidentified or aggregated consumer information{'\n'}
	•	Information excluded from the CCPA/CPRA's scope, such as:{'\n'}
	•	Health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act (CMIA) or clinical trial data{'\n'}
	•	Personal Information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver's Privacy Protection Act of 1994{'\n'}{'\n'}{'\n'}
  <Text style={appStyles.title}>Sources of Personal Information</Text>{'\n'}{'\n'}
We obtain the categories of personal information listed above from the following categories of sources:{'\n'}{'\n'}{'\n'}
	•	Directly from You. For example, from the forms You complete on our Service, preferences You express or provide through our Service.{'\n'}
	•	Indirectly from You. For example, from observing Your activity on our Service.{'\n'}
	•	Automatically from You. For example, through cookies We or our Service Providers set on Your Device as You navigate through our Service.{'\n'}
	•	From Service Providers. For example, or other third-party vendors that We use to provide the Service to You.{'\n'}{'\n'}
  <Text style={appStyles.title}>Use of Personal Information</Text>{'\n'}{'\n'}
We may use or disclose personal information We collect for "business purposes" or "commercial purposes" (as defined under the CCPA/CPRA), which may include the following examples:{'\n'}{'\n'}{'\n'}
	•	To operate our Service and provide You with Our Service.{'\n'}
	•	To provide You with support and to respond to Your inquiries, including to investigate and address Your concerns and monitor and improve our Service.{'\n'}
	•	To fulfill or meet the reason You provided the information. For example, if You share Your contact information to ask a question about our Service, We will use that personal information to respond to Your inquiry.{'\n'}
	•	To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.{'\n'}
	•	As described to You when collecting Your personal information or as otherwise set forth in the CCPA/CPRA.{'\n'}
	•	For internal administrative and auditing purposes.{'\n'}
	•	To detect security incidents and protect against malicious, deceptive, fraudulent or illegal activity, including, when necessary, to prosecute those responsible for such activities.{'\n'}
	•	Other one-time uses.{'\n'}{'\n'}{'\n'}
Please note that the examples provided above are illustrative and not intended to be exhaustive. For more details on how we use this information, please refer to the "Use of Your Personal Data" section.{'\n'}{'\n'}
If We decide to collect additional categories of personal information or use the personal information We collected for materially different, unrelated, or incompatible purposes We will update this Privacy Policy.{'\n'}{'\n'}
<Text style={appStyles.title}>Disclosure of Personal Information</Text>{'\n'}{'\n'}
We may use or disclose and may have used or disclosed in the last twelve (12) months the following categories of personal information for business or commercial purposes:{'\n'}{'\n'}{'\n'}
	•	Category A: Identifiers{'\n'}
	•	Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)){'\n'}
	•	Category F: Internet or other similar network activity{'\n'}
	•	Category G: Geolocation data{'\n'}
	•	Category L: Sensitive personal information{'\n'}{'\n'}{'\n'}
Please note that the categories listed above are those defined in the CCPA/CPRA. This does not mean that all examples of that category of personal information were in fact disclosed, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been disclosed.{'\n'}{'\n'}
When We disclose personal information for a business purpose or a commercial purpose, We enter a contract that describes the purpose and requires the recipient to both keep that personal information confidential and not use it for any purpose except performing the contract.{'\n'}{'\n'}
<Text style={appStyles.title}>Share of Personal Information</Text>{'\n'}{'\n'}
We may share, and have shared in the last twelve (12) months, Your personal information identified in the above categories with the following categories of third parties:{'\n'}{'\n'}{'\n'}
	•	Service Providers{'\n'}
	•	Our affiliates{'\n'}
	•	Our business partners{'\n'}
	•	Third party vendors to whom You or Your agents authorize Us to disclose Your personal information in connection with products or services We provide to You{'\n'}{'\n'}
  <Text style={appStyles.title}>Sale of Personal Information</Text>{'\n'}{'\n'}
As defined in the CCPA/CPRA, "sell" and "sale" mean selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer's personal information by the Business to a third party for valuable consideration. This means that We may have received some kind of benefit in return for sharing personal information, but not necessarily a monetary benefit.{'\n'}{'\n'}
We do not sell personal information as the term sell is commonly understood. We do allow Service Providers to use Your personal information for the business purposes described in Our Privacy Policy, and these may be deemed a sale under CCPA/CPRA.{'\n'}{'\n'}
We may sell and may have sold in the last twelve (12) months the following categories of personal information:{'\n'}{'\n'}
	•	Category A: Identifiers{'\n'}
	•	Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)){'\n'}
	•	Category F: Internet or other similar network activity{'\n'}
	•	Category G: Geolocation data{'\n'}
	•	Category L: Sensitive personal information{'\n'}{'\n'}
Please note that the categories listed above are those defined in the CCPA/CPRA. This does not mean that all examples of that category of personal information were in fact sold, but reflects our good faith belief to the best of Our knowledge that some of that information from the applicable category may be and may have been shared for value in return.{'\n'}{'\n'}
<Text style={appStyles.title}>Sale of Personal Information of Minors Under 16 Years of Age</Text>{'\n'}{'\n'}
We do not knowingly collect personal information from minors under the age of 16 through our Service, although certain third party websites that we link to may do so. These third-party websites have their own terms of use and privacy policies and We encourage parents and legal guardians to monitor their children's Internet usage and instruct their children to never provide information on other websites without their permission.{'\n'}{'\n'}
We do not sell the personal information of Consumers We actually know are less than 16 years of age, unless We receive affirmative authorization (the "right to opt-in") from either the Consumer who is between 13 and 16 years of age, or the parent or guardian of a Consumer less than 13 years of age. Consumers who opt-in to the sale of personal information may opt-out of future sales at any time. To exercise the right to opt-out, You (or Your authorized representative) may submit a request to Us by contacting Us.{'\n'}{'\n'}
If You have reason to believe that a child under the age of 13 (or 16) has provided Us with personal information, please contact Us with sufficient detail to enable Us to delete that information.{'\n'}{'\n'}
<Text style={appStyles.title}>Your Rights under the CCPA/CPRA</Text>{'\n'}{'\n'}
The CCPA/CPRA provides California residents with specific rights regarding their personal information. If You are a resident of California, You have the following rights:{'\n'}{'\n'}
	•	The right to notice. You have the right to be notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.{'\n'}
	•	The right to know/access. Under CCPA/CPRA, You have the right to request that We disclose information to You about Our collection, use, sale, disclosure for business purposes and share of personal information. Once We receive and confirm Your request, We will disclose to You:{'\n'}
	•	The categories of personal information We collected about You{'\n'}
	•	The categories of sources for the personal information We collected about You{'\n'}
	•	Our business or commercial purposes for collecting or selling that personal information{'\n'}
	•	The categories of third parties with whom We share that personal information{'\n'}
	•	The specific pieces of personal information We collected about You{'\n'}
	•	If we sold Your personal information or disclosed Your personal information for a business purpose, We will disclose to You:{'\n'}
	•	The categories of personal information categories sold{'\n'}
	•	The categories of personal information categories disclosed{'\n'}
	•	The right to say no to the sale or sharing of Personal Data (opt-out). You have the right to direct Us to not sell Your personal information. To submit an opt-out request, please see the "Do Not Sell My Personal Information" section or contact Us.{'\n'}
	•	The right to correct Personal Data. You have the right to correct or rectify any inaccurate personal information about You that We collected. Once We receive and confirm Your request, We will use commercially reasonable efforts to correct (and direct our Service Providers to correct) Your personal information, unless an exception applies.{'\n'}
	•	The right to limit use and disclosure of sensitive Personal Data. You have the right to request to limit the use or disclosure of certain sensitive personal information We collected about You, unless an exception applies. To submit, please see the "Limit the Use or Disclosure of My Sensitive Personal Information" section or contact Us.{'\n'}
	•	The right to delete Personal Data. You have the right to request the deletion of Your Personal Data under certain circumstances, subject to certain exceptions. Once We receive and confirm Your request, We will delete (and direct Our Service Providers to delete) Your personal information from our records, unless an exception applies. We may deny Your deletion request if retaining the information is necessary for Us or Our Service Providers to:{'\n'}
	•	Complete the transaction for which We collected the personal information, provide a good or service that You requested, take actions reasonably anticipated within the context of our ongoing business relationship with You, or otherwise perform our contract with You.{'\n'}
	•	Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.{'\n'}
	•	Debug products to identify and repair errors that impair existing intended functionality.{'\n'}
	•	Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.{'\n'}
	•	Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.).{'\n'}
	•	Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when the information's deletion may likely render impossible or seriously impair the research's achievement, if You previously provided informed consent.{'\n'}
	•	Enable solely internal uses that are reasonably aligned with consumer expectations based on Your relationship with Us.{'\n'}
	•	Comply with a legal obligation.{'\n'}
	•	Make other internal and lawful uses of that information that are compatible with the context in which You provided it.{'\n'}
	•	The right not to be discriminated against. You have the right not to be discriminated against for exercising any of Your consumer's rights, including by:{'\n'}
	•	Denying goods or services to You{'\n'}
	•	Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties{'\n'}
	•	Providing a different level or quality of goods or services to You{'\n'}
	•	Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services{'\n'}{'\n'}{'\n'}
  <Text style={appStyles.title}>Exercising Your CCPA/CPRA Data Protection Rights</Text>{'\n'}{'\n'}
Please see the "Do Not Sell My Personal Information" section and "Limit the Use or Disclosure of My Sensitive Personal Information" section for more information on how to opt out and limit the use of sensitive information collected.{'\n'}{'\n'}
Additionally, in order to exercise any of Your rights under the CCPA/CPRA, and if You are a California resident, You can contact Us:{'\n'}{'\n'}
	•	By email: admin@harvestyards.com{'\n'}{'\n'}
Only You, or a person registered with the California Secretary of State that You authorize to act on Your behalf, may make a verifiable request related to Your personal information.{'\n'}{'\n'}
Your request to Us must:{'\n'}{'\n'}
	•	Provide sufficient information that allows Us to reasonably verify You are the person about whom We collected personal information or an authorized representative{'\n'}
	•	Describe Your request with sufficient detail that allows Us to properly understand, evaluate, and respond to it{'\n'}{'\n'}
We cannot respond to Your request or provide You with the required information if We cannot:{'\n'}{'\n'}
	•	Verify Your identity or authority to make the request{'\n'}
	•	And confirm that the personal information relates to You{'\n'}{'\n'}
We will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonably necessary and with prior notice.{'\n'}{'\n'}
Any disclosures We provide will only cover the 12-month period preceding the verifiable request's receipt.{'\n'}{'\n'}
For data portability requests, We will select a format to provide Your personal information that is readily usable and should allow You to transmit the information from one entity to another entity without hindrance.{'\n'}{'\n'}
<Text style={appStyles.title}>Do Not Sell My Personal Information</Text>{'\n'}{'\n'}
As defined in the CCPA/CPRA, "sell" and "sale" mean selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer's personal information by the Business to a third party for valuable consideration. This means that We may have received some kind of benefit in return for sharing personal information, but not necessarily a monetary benefit.{'\n'}{'\n'}
We do not sell personal information as the term sell is commonly understood. We do allow Service Providers to use Your personal information for the business purposes described in Our Privacy Policy, and these may be deemed a sale under CCPA/CPRA.{'\n'}{'\n'}
You have the right to opt-out of the sale of Your personal information. Once We receive and confirm a verifiable consumer request from You, we will stop selling Your personal information. To exercise Your right to opt-out, please contact Us.{'\n'}{'\n'}
<Text style={appStyles.title}>Limit the Use or Disclosure of My Sensitive Personal Information</Text>{'\n'}{'\n'}
If You are a California resident, You have the right to limit the use and disclosure of Your sensitive personal information to that use which is necessary to perform the services or provide the goods reasonably expected by an average Consumer who requests such services or goods.{'\n'}{'\n'}
We collect, use and disclose sensitive personal information in ways that are necessary to provide the Service. For more information on how We use Your personal information, please see the "Use of Your Personal Data" section or contact us.{'\n'}{'\n'}
<Text style={appStyles.title}>"Do Not Track" Policy as Required by California Online Privacy Protection Act (CalOPPA)</Text>{'\n'}{'\n'}
Our Service does not respond to Do Not Track signals.{'\n'}{'\n'}
However, some third party websites do keep track of Your browsing activities. If You are visiting such websites, You can set Your preferences in Your web browser to inform websites that You do not want to be tracked. You can enable or disable DNT by visiting the preferences or settings page of Your web browser.{'\n'}{'\n'}
<Text style={appStyles.title}>Your California Privacy Rights (California's Shine the Light law)</Text>{'\n'}{'\n'}
Under California Civil Code Section 1798 (California's Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties' direct marketing purposes.{'\n'}{'\n'}
If you'd like to request more information under the California Shine the Light law, and if You are a California resident, You can contact Us using the contact information provided below.{'\n'}{'\n'}
<Text style={appStyles.title}>California Privacy Rights for Minor Users (California Business and Professions Code Section 22581)</Text>{'\n'}{'\n'}
California Business and Professions Code Section 22581 allows California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.{'\n'}{'\n'}
To request removal of such data, and if You are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.{'\n'}{'\n'}
Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.{'\n'}{'\n'}
<Text style={appStyles.title}>Children's Privacy</Text>{'\n'}{'\n'}
Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.{'\n'}{'\n'}
If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.{'\n'}{'\n'}
<Text style={appStyles.title}>Links to Other Websites</Text>{'\n'}{'\n'}
Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.{'\n'}{'\n'}
We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.{'\n'}{'\n'}
<Text style={appStyles.title}>Changes to this Privacy Policy</Text>{'\n'}{'\n'}
We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.{'\n'}{'\n'}
We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.{'\n'}{'\n'}
You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.{'\n'}{'\n'}
<Text style={appStyles.title}>Contact Us</Text>{'\n'}{'\n'}
If you have any questions about this Privacy Policy, You can contact us:{'\n'}{'\n'}
	•	By email: admin@harvestyards.com{'\n'}{'\n'}
      </Text>
       </View>
       <View style={{height:responsiveHeight(2)}}/>
</ScrollView>
    </SafeAreaView>
  )
}  