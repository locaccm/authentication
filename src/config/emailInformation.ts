require("dotenv").config();

const emailInformation = (
  ownerName: string,
  tenantEmail: string,
  address: string,
): string => {
  return `Bonjour,

${ownerName} vous invite en tant que locataire à rejoindre le logement situé à l'adresse suivante : ${address}.

Un email vous a été envoyé à l'adresse suivante : ${tenantEmail} pour finaliser l'invitation.

Merci de vous inscrire à cette adresse : ${process.env.REGISTER_URL!}.

Cordialement,
L'équipe de locaccm.`;
};

export default emailInformation;
