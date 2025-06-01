module "service_account_authentication" {
  source       = "./modules/service_account"
  account_id   = "auth-service"
  display_name = "Authentication Service Account"
  project_id   = "intricate-pad-455413-f7"
  roles        = [
    "roles/cloudsql.client",
    "roles/storage.objectViewer",
    "roles/secretmanager.secretAccessor"
  ]
}