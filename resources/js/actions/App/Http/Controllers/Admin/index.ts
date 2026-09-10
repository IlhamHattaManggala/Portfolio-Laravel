import AdminController from './AdminController'
import UploadController from './UploadController'
import ProjectController from './ProjectController'
import BlogController from './BlogController'
import MessageController from './MessageController'
import ExperienceController from './ExperienceController'
import CertificateController from './CertificateController'
import SkillController from './SkillController'
import TestimonialController from './TestimonialController'
import SettingController from './SettingController'
const Admin = {
    AdminController: Object.assign(AdminController, AdminController),
UploadController: Object.assign(UploadController, UploadController),
ProjectController: Object.assign(ProjectController, ProjectController),
BlogController: Object.assign(BlogController, BlogController),
MessageController: Object.assign(MessageController, MessageController),
ExperienceController: Object.assign(ExperienceController, ExperienceController),
CertificateController: Object.assign(CertificateController, CertificateController),
SkillController: Object.assign(SkillController, SkillController),
TestimonialController: Object.assign(TestimonialController, TestimonialController),
SettingController: Object.assign(SettingController, SettingController),
}

export default Admin