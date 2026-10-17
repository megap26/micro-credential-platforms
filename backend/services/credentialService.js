import crypto from 'crypto';

/**
 * Generates an immutable, human-friendly unique Credential ID
 * Format: CRED-2026-XXXX-XXXX
 */
export const generateCredentialId = () => {
  const year = new Date().getFullYear();
  const segment1 = crypto.randomBytes(2).toString('hex').toUpperCase();
  const segment2 = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `CRED-${year}-${segment1}-${segment2}`;
};

/**
 * Generates a SHA-256 cryptographic verification signature
 */
export const generateVerificationHash = ({
  credentialId,
  learnerEmail,
  microCredentialTitle,
  scorePercent,
  issueDate,
}) => {
  const secretSalt = process.env.JWT_SECRET || 'skillpulse_salt_credential_2026';
  const payload = `${credentialId}|${learnerEmail.toLowerCase()}|${microCredentialTitle}|${scorePercent}|${new Date(issueDate).toISOString()}|${secretSalt}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
};

/**
 * Determines badge tier based on assessment score
 */
export const computeBadgeTier = (scorePercent) => {
  if (scorePercent >= 95) return 'Diamond';
  if (scorePercent >= 88) return 'Platinum';
  if (scorePercent >= 75) return 'Gold';
  return 'Silver';
};
