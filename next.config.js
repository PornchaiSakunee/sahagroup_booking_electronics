'use strict'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,

  // output: "export",

  // TODO: below line is added to resolve twice event dispatch in the calendar reducer
  reactStrictMode: false
}

module.exports = nextConfig