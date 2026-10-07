const access={
 ADMIN:['*'],DOCTOR:['patients','doctors','departments','appointments','medicalRecords','prescriptions','laboratory','admissions','notifications'],
 NURSE:['patients','admissions','notifications'],RECEPTIONIST:['patients','doctors','departments','appointments','admissions','billing','notifications'],
 LAB_STAFF:['patients','laboratory','notifications'],PHARMACIST:['patients','prescriptions','inventory','notifications'],ACCOUNTANT:['patients','billing','notifications'],PATIENT:['patients','doctors','appointments','medicalRecords','prescriptions','laboratory','billing','notifications']
};
function owns(role,key){return access[role]?.includes('*')||access[role]?.includes(key);}
function canRead(role,key){return owns(role,key)||key==='staff'&&role==='ADMIN'||key==='users'&&role==='ADMIN';}
function canWrite(role,key){if(role==='ADMIN')return true;const writable={DOCTOR:['medicalRecords','prescriptions','laboratory'],NURSE:['admissions'],RECEPTIONIST:['patients','appointments','admissions','billing'],LAB_STAFF:['laboratory'],PHARMACIST:['inventory'],ACCOUNTANT:['billing'],PATIENT:['notifications']};return writable[role]?.includes(key)||false;}
module.exports={canRead,canWrite};
