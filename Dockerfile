ARG FUNCTION_DIR="/function"

# Build Stage 1: Install aws-lambda-ric dependencies, npm install package.json dependencies
FROM node:20-buster as build-image
# Include global arg in this stage of the build
ARG FUNCTION_DIR
# AWS Lambda runtime dependencies
RUN apt-get update && \
    apt-get install -y \
        g++ \
        make \
        unzip \
        libcurl4-openssl-dev \
        autoconf \
        libtool \
        cmake
# Copy function code
RUN mkdir -p ${FUNCTION_DIR}/

WORKDIR ${FUNCTION_DIR}

RUN npm install aws-lambda-ric
RUN npm install --include=optional sharp

# Build Stage 2: Copy Build Stage 1 files in to Stage 2. Install chromium dependencies and chromium.
FROM node:20-buster-slim
# Include global arg in this stage of the build
ARG FUNCTION_DIR
# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}
# Copy in the build image dependencies
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}
RUN ls ${FUNCTION_DIR}
# Install chromium and dependencies
RUN apt-get update \
    && apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV HOME="/tmp"

COPY dist ${FUNCTION_DIR}/dist
COPY models ${FUNCTION_DIR}/models
COPY package.json ${FUNCTION_DIR}
COPY src ${FUNCTION_DIR}/src
COPY index.js ${FUNCTION_DIR}
COPY node_modules ${FUNCTION_DIR}/node_modules

WORKDIR ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD [ "index.handler" ]