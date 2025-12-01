// src/data/icons.ts

export type IconName =
  | "react"
  | "nextjs"
  | "typescript"
  | "laravel"
  | "go"
  | "nodejs"
  | "postgresql"
  | "mysql"
  | "mongodb"
  | "redis"
  | "docker"
  | "linux"
  | "nginx"
  | "git"
  | "jenkins"
  | "flutter"
  | "dart"
  | "vuejs";

export const ICON_SRC_MAP: Record<IconName, string> = {
  react: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  nextjs: "/icons/nextjs.svg",
  typescript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  laravel: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
  go: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
  nodejs: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",

  postgresql: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
  mysql: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
  mongodb: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
  redis: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",

  docker: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  linux: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
  nginx: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg",
  git: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  jenkins: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",

  flutter: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg",
  dart: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg",
  vuejs: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
};
