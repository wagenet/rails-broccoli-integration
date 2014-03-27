task :setup do
  cd "broccoli" do
    sh "npm install"
  end

  cd "rails" do
    sh "bundle install"
  end

  cd "proxy" do
    sh "npm install"
  end
end

task :server do
  sh "foreman start"
end