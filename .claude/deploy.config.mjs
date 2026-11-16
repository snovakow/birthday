// This project's additions to the /deploy skill, which builds a branch's committed files in a temp folder
// and copies the build into the live folder. The skill is shared between projects, so this file names
// this one's folder among the machine's live folders, which git config deploy.liveRoot says where to find.
//
// Hard-coded while the site is a single page for one person. The build itself runs from any folder, so
// this is the only place that names it.
export default {
  liveName: 'rayapapaya',
};
