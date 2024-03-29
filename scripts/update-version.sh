#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
eval JS_API=true
eval GNU=false
eval EXEC_COMPONENT=true
eval DIFFERENT_JS_API=false
eval AUTO=false

eval projects=( "adf-cli-acs-aps-template"
    "adf-cli-acs-template"
    "adf-cli-activiti-acs-template"
    "adf-cli-activiti-community-template"
    "adf-cli-activiti-community-acs-template"
    "adf-cli-apa-acs-template"
    "adf-cli-apa-template"
    "adf-cli-aps-template" )

eval libs=( "core"
    "extensions"
    "process-services-cloud"
    "content-services"
    "process-services"
    "insights"
    "testing" )

cd `dirname $0`

prefix="@alfresco\/adf-"

show_help() {
    echo "Usage: update-version.sh"
    echo ""
    echo "-sj or -sjsapi  don't update js-api version"
    echo "-vj or -versionjsapi  to use a different version of js-api"
    echo "-v or -version  version to update"
    echo "-alpha update last alpha version of js-api and lib automatically"
    echo "-beta update beta alpha version of js-api and lib automatically"
    echo "-gnu for gnu"
}

skip_js() {
    echo "====== Skip JS-API change version $1 ====="
    JS_API=false
}

last_alpha_mode() {
    echo "====== Auto find last ALPHA version ====="
    VERSION=$(npm view @alfresco/adf-core@alpha version)

    echo "====== version lib ${VERSION} ====="

    DIFFERENT_JS_API=true
    VERSION_JS_API=$(npm view @alfresco/js-api@alpha version)

    echo "====== version js-api ${DIFFERENT_JS_API} ====="
}

last_beta_mode() {
    echo "====== Auto find last BETA version ====="
    VERSION=$(npm view @alfresco/adf-core@beta version)

    echo "====== version lib ${VERSION} ====="

    DIFFERENT_JS_API=true
    VERSION_JS_API=$(npm view @alfresco/js-api@beta version)

    echo "====== version js-api ${DIFFERENT_JS_API} ====="
}

gnu_mode() {
    echo "====== GNU MODE ====="
    GNU=true
}

version_change() {
    echo "====== New version $1 ====="
    VERSION=$1
}

version_js_change() {
    echo "====== Alfresco JS-API version $1 ====="
    VERSION_JS_API=$1
    DIFFERENT_JS_API=true
}

update_main_version() {
   echo "====== UPDATE MAIN PKG VERSION  to ${VERSION} in the package.json ======"
   sed "${sedi[@]}" "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g"  $DIR/../package.json
}

update_component_version() {
   echo "====== UPDATE PACKAGE VERSION  to ${VERSION} in the package.json ======"
   sed "${sedi[@]}" "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g"  ./package.json
}

clean_lock() {
   echo "====== clean lock file ======"
   rm ./package-lock.json
}

update_component_dependency_version(){
   for (( j=0; j<${libslength}; j++ ));
    do
       echo "====== UPDATE DEPENDENCY VERSION of ${prefix}${libs[$j]} to ~${VERSION}======"

       sed "${sedi[@]}" "s/\"${prefix}${libs[$j]}\": \".*\"/\"${prefix}${libs[$j]}\": \"${VERSION}\"/g"  ./package.json
       sed "${sedi[@]}" "s/\"${prefix}${libs[$j]}\": \"~.*\"/\"${prefix}${libs[$j]}\": \"~${VERSION}\"/g"  ./package.json
       sed "${sedi[@]}" "s/\"${prefix}${libs[$j]}\": \"^.*\"/\"${prefix}${libs[$j]}\": \"^${VERSION}\"/g"  ./package.json

    done
}

update_component_js_version(){
   echo "====== UPDATE DEPENDENCY VERSION of @alfresco/js-api in ${1} to ${2} ======"
   PACKAGETOCHANGE="@alfresco\/js-api"

   sed "${sedi[@]}" "s/\"${PACKAGETOCHANGE}\": \".*\"/\"${PACKAGETOCHANGE}\": \"${2}\"/g"  ./package.json
   sed "${sedi[@]}" "s/\"${PACKAGETOCHANGE}\": \"~.*\"/\"${PACKAGETOCHANGE}\": \"${2}\"/g"  ./package.json
   sed "${sedi[@]}" "s/\"${PACKAGETOCHANGE}\": \"^.*\"/\"${PACKAGETOCHANGE}\": \"${2}\"/g"  ./package.json

}

while [[ $1  == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -v|version) version_change $2; shift 2;;
      -sj|sjsapi) skip_js; shift;;
      -vj|versionjsapi)  version_js_change $2; shift 2;;
      -gnu) gnu_mode; shift;;
      -alpha) last_alpha_mode; shift;;
      -beta) last_beta_mode; shift;;
      -*) shift;;
    esac
done

if $GNU; then
 sedi='-i'
else
 sedi=('-i' '')
fi

if [[ "${VERSION}" == "" ]]
then
  echo "Version number required"
  exit 1
fi

projectslength=${#projects[@]}
libslength=${#libs[@]}

if $EXEC_COMPONENT == true; then
    echo "====== UPDATE TEMPLATES ======"
    update_main_version
    # use for loop to read all values and indexes
    for (( i=0; i<${projectslength}; i++ ));
    do    # use for loop to read all values and indexes
     cd "$DIR/../app/templates/${projects[$i]}"
     echo "====== UPDATE TEMPLATE ${projects[$i]} ======"
     clean_lock
     update_component_version

     update_component_dependency_version

     if $JS_API == true; then

      if $DIFFERENT_JS_API == true; then
          update_component_js_version ${projects[$i]} ${VERSION_JS_API}
      else
          update_component_js_version ${projects[$i]} ${VERSION}
      fi

     fi
    done
fi
