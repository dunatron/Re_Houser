import { makeStyles } from '@material-ui/core/styles';
import Alert from '@/Components/Alert';

import Container from '@/Components/Container';
import Section from '@/Components/Section';

import {
  Avatar,
  Typography,
  CardHeader,
  Paper,
  Button,
  Box,
  ButtonGroup,
} from '@material-ui/core';

import { String, Date, ChipItems } from '@/Components/Displays';

//icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { SectionExamples } from '../StyleExamples';

import RenderCloudinaryType from '@/Components/UploadWidget/RenderType';

import ForeignLinksTable from '@/Components/Tables/ForeignLinksTable';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0 auto',
  },
}));

function GroupedSection({ title, children }) {
  return (
    <div>
      <Typography gutterBottom variant="caption">
        {title}
      </Typography>
      <Section elevation={1} padding={1}>
        {children}
      </Section>
    </div>
  );
}

/**
 *
 * Note combine with the <PublicDetailsDisplay /> for the actual full details display
 */
export default function PrivateDetailsDisplay({ user }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container gap={1}>
        <GroupedSection title="Basic details">
          <String title="Phone" value={user.phone} orientation="vertical" />
          <String title="Email" value={user.email} orientation="vertical" />
          isAdmin
          <Date
            title="CreatedAt"
            value={user.createdAt}
            format="LongDateTime"
            orientation="vertical"
          />
          <Date
            title="Last Updated"
            value={user.updatedAt}
            format="LongDateTime"
            orientation="vertical"
          />
        </GroupedSection>

        <GroupedSection title="Permissions">
          <ChipItems title="Permissions" items={user.permissions} />
        </GroupedSection>

        <GroupedSection title="System validation">
          <String
            title="Rehouser stamp"
            value={user.rehouserStamp ? 'Yes' : 'NO'}
            orientation="vertical"
          />
          <String
            title="Email validated"
            value={user.rehouserStamp ? 'Yes' : 'NO'}
            orientation="vertical"
          />
        </GroupedSection>
        <div>
          <Typography variant="caption" gutterBottom>
            Profile photo
          </Typography>
          <RenderCloudinaryType file={user.profilePhoto} />
        </div>
        <GroupedSection title="Identification">
          <String
            title="photoIdType"
            value={user.photoIdType}
            orientation="vertical"
          />
          <String
            title="identificationNumber"
            value={user.identificationNumber}
            orientation="vertical"
          />
          Photo Identification
          <RenderCloudinaryType file={user.photoIdentification} />
        </GroupedSection>
        <GroupedSection title="Emergency Contact">
          <String
            title="emergencyContactName"
            value={user.emergencyContactName}
          />
          <String
            title="emergencyContactNumber"
            value={user.emergencyContactNumber}
          />
          <String
            title="emergencyContactEmail"
            value={user.emergencyContactEmail}
          />
        </GroupedSection>
        <div>
          <Typography variant="caption" gutterBottom>
            Foreign Links
          </Typography>
          <ForeignLinksTable />
        </div>
      </Container>
    </div>
  );
}

// DETAILS TO USE
// foreignLinks {
//   ...foreignLinkInfo
// }
// referees {
//   ...refereeInfo
// }
// signature {
//   ...fileInfo
// }
// currentAddress {
//   ...addressInfo
// }
// proofOfAddress {
//   ...fileInfo
// }
// acceptedSignupTerms
// acceptedTermsOfEngagement
// bankDetails {
//   ...bankDetailInfo
// }
// bondLodgementNumber

// id: ID! @unique @id
// updatedAt: DateTime! @updatedAt
// createdAt: DateTime! @createdAt
// dob: DateTime
// firstName: String!
// lastName: String!
// emailValidated: Boolean @default(value: false)
// password: String!
// resetToken: String
// resetTokenExpiry: Float
// confirmEmailToken: String
// confirmEmailTokenExpiry: Float
// permissions: [Permission] @scalarList(strategy: RELATION)
// properties: [Property!]! @relation(name: "PropertyOwner", onDelete: SET_NULL)
// managedProperties: [Property!]!
//   @relation(name: "PropertyAgents", onDelete: SET_NULL)
// lesseeLeases: [Lessee!]!
//   @relation(name: "UserLesseeLeases", onDelete: SET_NULL)
// lessorLeases: [Lessor!]!
//   @relation(name: "UserLessorLeases", onDelete: SET_NULL)
// createdProperties: [Property!]!
//   @relation(name: "PropertyCreator", onDelete: SET_NULL)
// photoIdentification: File
//   @relation(name: "UserPhotoId", link: TABLE, onDelete: CASCADE)
// photoIdType: PhotoIdType
// profilePhoto: File
//   @relation(name: "UserProfilePhoto", link: TABLE, onDelete: CASCADE)
// identificationNumber: String
// emergencyContactName: String
// emergencyContactNumber: String
// emergencyContactEmail: String
// referees: [Referee]
//   @relation(name: "UserReferees", link: TABLE, onDelete: CASCADE)
// referee1Relationhip: String
// referee1Name: String
// referee1Phone: String
// referee1Email: String
// referee2Relationhip: String
// referee2Name: String
// referee2Phone: String
// referee2Email: String
// creditCards: [CreditCard!]!
//   @relation(name: "UserCreditCards", onDelete: CASCADE)
// primaryCreditCard: CreditCard @relation(name: "UserPrimaryCreditCard")
// chats: [Chat!]! @relation(name: "UserChats", onDelete: SET_NULL)
// sentMessages: [Message!]!
//   @relation(name: "UserSentMessages", onDelete: SET_NULL)
// recievedMessages: [Message!]!
//   @relation(name: "UserRecievedMessages", onDelete: SET_NULL)
// rehouserStamp: Boolean
// signature: File @relation(name: "UserSignature", link: TABLE)
// activity: [Activity!]! @relation(name: "UserActivity", onDelete: SET_NULL)
// involvedActivity: [Activity!]!
//   @relation(name: "InvolvedActivity", onDelete: SET_NULL)
// rentalAppraisals: [RentalAppraisal] @relation(name: "UserRentalAppraisals")
// appraisedApplications: [RentalAppraisal]
//   @relation(name: "UserAppraisalsAppraised")
// currentAddress: Address
//   @relation(name: "CurrentUserAddress", link: TABLE, onDelete: CASCADE)
// proofOfAddress: File
//   @relation(name: "UserProofOfAddress", link: TABLE, onDelete: CASCADE)
// acceptedSignupTerms: Boolean!
// adminSettings: AdminSetting!
//   @relation(name: "UserAdminSettings", link: TABLE, onDelete: CASCADE)
// viewings: [Viewing!]! @relation(name: "HostViewings", onDelete: SET_NULL)
// acceptedTermsOfEngagement: Boolean
// bankDetails: BankDetail
//   @relation(name: "UserBankDetails", link: TABLE, onDelete: CASCADE)
// inspections: [Inspection]
//   @relation(name: "InspectionInspector", link: TABLE, onDelete: SET_NULL)
// bondLodgementNumber: String
