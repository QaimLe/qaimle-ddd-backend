// src/core/domain/user/entities/user.entity.ts
import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private auth0Id: string,
    private email: Email,
    private username: string,
    private phone?: string,
    private nickname?: string,
    private fullName?: string,
    private gender?: string,
    private ageGroup?: string,
    private nationality?: string,
    private employmentSector?: string,
    private profession?: string,
    private city?: string,
    private personalEmail?: string,
    private mobileVerified: boolean = false,
    private loyaltyTier?: string,
    private subscriptionTier?: string,
    private profileStatus: string = 'pending',
    private roles: string[] = ['user'],
    private createdAt: Date = new Date(),
    private updatedAt?: Date,
    private deletedAt?: Date,
  ) { }

  // --- Getters ---
  getId(): UserId {
    return this.id;
  }

  getAuth0Id(): string {
    return this.auth0Id;
  }

  getEmail(): Email {
    return this.email;
  }

  getUsername(): string {
    return this.username;
  }

  getPhone(): string | undefined {
    return this.phone;
  }

  getNickname(): string | undefined {
    return this.nickname;
  }

  getFullName(): string | undefined {
    return this.fullName;
  }

  getGender(): string | undefined {
    return this.gender;
  }

  getAgeGroup(): string | undefined {
    return this.ageGroup;
  }

  getNationality(): string | undefined {
    return this.nationality;
  }

  getEmploymentSector(): string | undefined {
    return this.employmentSector;
  }

  getProfession(): string | undefined {
    return this.profession;
  }

  getCity(): string | undefined {
    return this.city;
  }

  getPersonalEmail(): string | undefined {
    return this.personalEmail;
  }

  isMobileVerified(): boolean {
    return this.mobileVerified;
  }

  getLoyaltyTier(): string | undefined {
    return this.loyaltyTier;
  }

  getSubscriptionTier(): string | undefined {
    return this.subscriptionTier;
  }

  getProfileStatus(): string {
    return this.profileStatus;
  }

  getRoles(): string[] {
    return this.roles;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // --- Actions / Domain Methods ---
  changeEmail(newEmail: Email) {
    this.email = newEmail;
  }

  changeUsername(newUsername: string) {
    this.username = newUsername;
  }

  updatePhone(phone?: string) {
    this.phone = phone;
  }

  updateNickname(nickname?: string) {
    this.nickname = nickname;
  }

  updateFullName(fullName?: string) {
    this.fullName = fullName;
  }

  updateGender(gender?: string) {
    this.gender = gender;
  }

  updateAgeGroup(ageGroup?: string) {
    this.ageGroup = ageGroup;
  }

  updateNationality(nationality?: string) {
    this.nationality = nationality;
  }

  updateEmploymentSector(sector?: string) {
    this.employmentSector = sector;
  }

  updateProfession(profession?: string) {
    this.profession = profession;
  }

  updateCity(city?: string) {
    this.city = city;
  }

  updatePersonalEmail(email?: string) {
    this.personalEmail = email;
  }

  verifyMobile() {
    this.mobileVerified = true;
  }

  setLoyaltyTier(tier?: string) {
    this.loyaltyTier = tier;
  }

  setSubscriptionTier(tier?: string) {
    this.subscriptionTier = tier;
  }

  updateProfileStatus(status: string) {
    this.profileStatus = status;
  }

  addRole(role: string) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  removeRole(role: string) {
    this.roles = this.roles.filter((r) => r !== role);
  }

  updatePersonalInfo(data: Partial<Omit<User, 'id' | 'auth0Id'>>) {
    Object.assign(this, data);
  }
}
