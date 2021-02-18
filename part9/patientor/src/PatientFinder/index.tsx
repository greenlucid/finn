import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon, List, Button } from 'semantic-ui-react';
import { Gender, Patient, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, NewEntry } from '../types';
import { useStateValue } from '../state';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { addEntry } from "../state/patientReducer";

interface Props {
  patient: Patient;
}

const GenderIcon: React.FC<{ gender: Gender }> = ({ gender } ) => {
  switch (gender) {
    case 'male':
      return <Icon name='mars'/>;
    case 'female':
      return <Icon name='venus'/>;
    case 'other':
      return <Icon name='neuter'/>;
    default:
      return <Icon name='genderless'/>;
  }
};

const DiagnosisCodes: React.FC<{ codes: string[] | undefined}> = ({ codes }) => {
  const [{ diagnosis }] = useStateValue();
  if (!diagnosis || !codes) {
    return null;
  } else if (Object.keys(diagnosis).length === 0) {
      return <Container>No diagnoses found</Container>;
  } else {
    return (
      <List bulleted>
        {codes.map((code, index) => <List.Item key={index}>{code} {diagnosis[code].name}</List.Item>)}
      </List>
    );
  }
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Container>
      <Header as='h3'><Icon name='hospital'/>{entry.date}</Header>
      <p style={{color: 'gray'}}>{entry.description}</p>
      <br/>
    </Container>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Container>
      <Header as='h3'>
        <Icon name='doctor'/>{entry.date}
      </Header>
      {[...Array(4-entry.healthCheckRating).keys()].map((n) => <Icon key={n} name='heart' color='red'/>)}
      <p style={{color: 'gray'}}>{entry.description}</p>
      <br/>
    </Container>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Container>
      <Header as='h3'><Icon name='wrench'/>{entry.date} {entry.employerName}</Header>
      <p style={{color: 'gray'}}>{entry.description}</p>
      <br/>
    </Container>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry}/>;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry}/>;
    default:
      return null;
  }
};

const EntryCommon: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Container>
      <EntryDetails entry={entry}/>
      <DiagnosisCodes codes={entry.diagnosisCodes}/>
      <br/>
    </Container>
  );
};

const PatientShow: React.FC<Props> = ({ patient }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const getEntryFromForm = (values: EntryFormValues): NewEntry => {
      switch (values.type) {
        case "HealthCheck":
          return ({
            type: values.type,
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            healthCheckRating: values.healthCheckRating
          });
        case "Hospital":
          return ({
            type: values.type,
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            discharge: values.discharge
          });
        case "OccupationalHealthcare":
          return ({
            type: values.type,
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            employerName: values.employerName,
            sickLeave: values.sickLeave
          });
      }
    };
    try {
      const newEntry = getEntryFromForm(values);
      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        newEntry
      );
      dispatch(addEntry(entry, patient.id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const ssn = patient.ssn ? patient.ssn : 'Unknown';
  return (
    <Container>
      <Header as='h1'>{patient.name} <GenderIcon gender={patient.gender}/></Header>
      <p>ssn: {ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {patient.entries.length !== 0 && <Header as='h3'>Entries:</Header>}
      <br/>
      {patient.entries.map(entry => <EntryCommon key={entry.id} entry={entry}/>)}
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

const PatientFinder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const patient = patients[id];
  if (!patient) {
    return <div>Not found</div>;
  } else {
  return (
      <div>
        <PatientShow patient={patient} />
      </div>
    );
  }
};


export default PatientFinder;