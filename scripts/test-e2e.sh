#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$DIR/../"
BROWSER_RUN=false
DEVELOPMENT=false
EXECLINT=true
LITESERVER=false
GNU=false

show_help() {
    echo "Usage: ./scripts/test-e2e-lib.sh -host adf.domain.com -u admin -p admin -e admin"
    echo ""
    echo "-u or --username"
    echo "-p or --password"
    echo "-e or --email"
    echo "-b or --browser run the test in the browsrwer (No headless mode)"
    echo "--seleniumServer configure a selenium server to use to run the e2e test"
    echo "-proxy or --proxy proxy Back end URL to use only possibel to use with -dev option"
    echo "-s or --spec run a single test file"
    echo "-f or --folder run a single folder test"
    echo "-dev or --dev run it against local development environment it will deploy on localhost:4200 the current version of your branch"
    echo "-host or --host URL of the Front end to test"
    echo "-host_bpm URL of the Back end to test"
    echo "-host_identity URL of the identity service backend to test"
    echo "-host_sso the entire path including the name of the realm"
    echo "-sso enables sso login"
    echo "-save  save the error screenshot in the remote env"
    echo "-timeout or --timeout override the timeout foe the wait utils"
    echo "-sl --skip-lint skip lint"
    echo "-h or --help"
    echo "-gnu for gnu"
}

set_username(){
    USERNAME=$1
}
set_password(){
    PASSWORD=$1
}
set_email(){
    EMAIL=$1
}
set_host(){
    HOST=$1
}

set_host_bpm(){
    HOST_BPM=$1
}

set_host_sso(){
    HOST_SSO=$1
}

set_host_identity(){
    HOST_IDENTITY=$1
}

set_browser(){
    echo "====== BROWSER RUN ====="
    BROWSER_RUN=true
}

set_proxy(){
    PROXY=$1
}

set_timeout(){
    TIMEOUT=$1
}

set_save_screenshot(){
    SAVE_SCREENSHOT=true
}

set_development(){
    DEVELOPMENT=true
}

set_selenium(){
    SELENIUM_SERVER=$1
}

skip_lint(){
    EXECLINT=false
}

set_test(){
    SINGLE_TEST=true
    NAME_TEST=$1
}

set_test_folder(){
    FOLDER=$1
}

set_sso(){
    SSO=true
}

gnu_mode() {
    echo "====== GNU MODE ====="
    GNU=true
}

set_sso_proxy(){
    echo "====== SET SSO PROXY ======"

    echo "${DIR}"

    sed "${sedi[@]}" "s/\"bpmHost\": \".*\"/\"bpmHost\": \"${HOST_BPM}\"/g" ${DIR}/../app/templates/$FOLDER/src/app.config.json
    sed "${sedi[@]}" "s/\"identityHost\": \".*\"/\"identityHost\": \"${HOST_IDENTITY}\"/g" ${DIR}/../app/templates/$FOLDER/src/app.config.json
    sed "${sedi[@]}" "s/\"host\": \".*\"/\"host\": \"${HOST_SSO}\"/g" ${DIR}/../app/templates/$FOLDER/src/app.config.json
}

while [[ $1 == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -u|--username)  set_username $2; shift 2;;
      -p|--password)  set_password $2; shift 2;;
      -e|--email)  set_email $2; shift 2;;
      -timeout|--timeout)  set_timeout $2; shift 2;;
      -b|--browser)  set_browser; shift;;
      -dev|--dev)  set_development; shift;;
      -s|--spec)  set_test $2; shift 2;;
      -gnu) gnu_mode; shift;;
      -save)   set_save_screenshot; shift;;
      -f|--folder)  set_test_folder $2; shift 2;;
      -proxy|--proxy)  set_proxy $2; shift 2;;
      -s|--seleniumServer) set_selenium $2; shift 2;;
      -host|--host)  set_host $2; shift 2;;
      -host_bpm|--host_bpm) set_host_bpm $2; shift 2;;
      -host_sso|--host_sso) set_host_sso $2; shift 2;;
      -host_identity|--host_identity) set_host_identity $2; shift 2;;
      -sl|--skip-lint)  skip_lint; shift;;
      -sso|--sso)  set_sso; shift;;
      -*) echo "invalid option: $1" 1>&2; show_help; exit 1;;
    esac
done

rm -rf ./e2e/downloads/
rm -rf ./e2e-output/screenshots/

export URL_HOST_ADF=$HOST
export URL_HOST_BPM_ADF=$HOST_BPM
export URL_HOST_SSO_ADF=$HOST_SSO
export URL_HOST_IDENTITY=$HOST_IDENTITY
export SSO_LOGIN=$SSO
export USERNAME_ADF=$USERNAME
export PASSWORD_ADF=$PASSWORD
export EMAIL_ADF=$EMAIL
export BROWSER_RUN=$BROWSER_RUN
export PROXY_HOST_ADF=$PROXY
export SAVE_SCREENSHOT=$SAVE_SCREENSHOT
export TIMEOUT=$TIMEOUT
export SELENIUM_SERVER=$SELENIUM_SERVER
export NAME_TEST=$NAME_TEST

if $GNU; then
 sedi='-i'
else
 sedi=('-i' '')
fi

npm install

if [[ $SSO == "true" ]]; then
    set_sso_proxy
fi

cd ${DIR}/../app/templates/$FOLDER

npm install

echo "build $FOLDER"

npm run build:dist

rm -rf node_modules

cd ../../../

echo "webdriver update"

./node_modules/protractor/node_modules/webdriver-manager/bin/webdriver-manager update --standalone false --gecko false

echo "RUN TEST E2E"

npm run lite-server-e2e -- --baseDir="app/templates/$FOLDER/dist/" & ./node_modules/protractor/bin/protractor protractor.conf.js || exit 1




