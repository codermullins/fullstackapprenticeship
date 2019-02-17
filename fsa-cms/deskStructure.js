// This the the structure for the whole cms

import S from "@sanity/desk-tool/structure-builder";

const hiddenDocTypes = listItem => ! [
    "config"
].includes(listItem.getId())

export default () =>
    S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Full-Stack Apprenticeship")
                .child(
                    S.list()
                        .title("Tools")
                        .items([
                            S.listItem()
                                .title("Getting Started")
                                .child(
                                    S.documentList()
                                        .title('Getting Started')
                                        .menuItems(S.documentTypeList('gettingStartedSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'gettingStartedSchema' })
                                ),
                            S.listItem()
                                .title("React Native")
                                .child(
                                    S.documentList()
                                        .title('React Web')
                                        .menuItems(S.documentTypeList('nativeSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'nativeSchema' })
                                ),
                            S.listItem()
                                .title("React Web")
                                .child(
                                    S.documentList()
                                        .title('React Web')
                                        .menuItems(S.documentTypeList('webSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'webSchema' })
                                ),
                            S.listItem()
                                .title("Node.js")
                                .child(
                                    S.documentList()
                                        .title('Node.js')
                                        .menuItems(S.documentTypeList('backEndSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'backEndSchema' })
                                ),
                            S.listItem()
                                .title("Applied Computer Science")
                                .child(
                                    S.documentList()
                                        .title('Algorithms')
                                        .menuItems(S.documentTypeList('algorithmsSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'algorithmsSchema' })
                                ),
                            S.listItem()
                                .title("Serverless")
                                .child(
                                    S.documentList()
                                        .title('Serverless')
                                        .menuItems(S.documentTypeList('serverlessSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'serverlessSchema' })
                                ),
                            S.listItem()
                                .title("Command Line Interface (CLI) Tools")
                                .child(
                                    S.documentList()
                                        .title('Command Line (CLI)')
                                        .menuItems(S.documentTypeList('commandLineSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'commandLineSchema' })
                                ),
                            S.listItem()
                                .title("Payments & Money")
                                .child(
                                    S.documentList()
                                        .title('Payments')
                                        .menuItems(S.documentTypeList('paymentsSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'paymentsSchema' })
                                ),
                            S.listItem()
                                .title("Testing")
                                .child(
                                    S.documentList()
                                        .title('Testing')
                                        .menuItems(S.documentTypeList('testingSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'testingSchema' })
                                ),
                            S.listItem()
                                .title("User Experience & Design")
                                .child(
                                    S.documentList()
                                        .title('UX & UI Design')
                                        .menuItems(S.documentTypeList('uxSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'uxSchema' })
                                ),
                            S.listItem()
                                .title("Meta-Learning")
                                .child(
                                    S.documentList()
                                        .title('The Learning Process')
                                        .menuItems(S.documentTypeList('learningSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'learningSchema' })
                                ),
                            S.listItem()
                                .title("Javascript - ES6 & Beyond")
                                .child(
                                    S.documentList()
                                        .title('Javascript')
                                        .menuItems(S.documentTypeList('javascriptSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'javascriptSchema' })
                                ),
                            S.listItem()
                                .title("Git & Version Control")
                                .child(
                                    S.documentList()
                                        .title('Git')
                                        .menuItems(S.documentTypeList('gitSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'gitSchema' })
                                ),
                            S.listItem()
                                .title("Amazon Web Services")
                                .child(
                                    S.documentList()
                                        .title('Amazon Web Services')
                                        .menuItems(S.documentTypeList('awsSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'awsSchema' })
                                ),
                            S.listItem()
                                .title("Security")
                                .child(
                                    S.documentList()
                                        .title('Security')
                                        .menuItems(S.documentTypeList('securitySchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'securitySchema' })
                                ),
                            S.listItem()
                                .title("DevOps")
                                .child(
                                    S.documentList()
                                        .title('DevOps')
                                        .menuItems(S.documentTypeList('devopsSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'devopsSchema' })
                                ),
                        ])
                ),
                S.listItem()
                .title("City by City")
                .child(
                    S.list()
                        .title("Cities Around")
                        .items([
                            S.listItem()
                                .title("Seattle")
                                .child(
                                    S.documentList()
                                        .title('Seattle')
                                        .menuItems(S.documentTypeList('seattleSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'seattleSchema' })
                                ),
                            S.listItem()
                                .title("Bellevue - East Side")
                                .child(
                                    S.documentList()
                                        .title('East Side')
                                        .menuItems(S.documentTypeList('eastsideSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'eastsideSchema' })
                                ),
                            S.listItem()
                                .title("New York City")
                                .child(
                                    S.documentList()
                                        .title('New York City')
                                        .menuItems(S.documentTypeList('nySchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'nySchema'})
                          ),
                                S.listItem()
                                .title("Tacoma")
                                .child(
                                    S.documentList()
                                        .title('Tacoma')
                                        .menuItems(S.documentTypeList('tacomaSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'tacomaSchema' })
                                ),
                                S.listItem()
                                .title("Everett")
                                .child(
                                    S.documentList()
                                        .title('Everett')
                                        .menuItems(S.documentTypeList('everettSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'everettSchema' })
                                ),
                        ])
                ),
                S.listItem()
                .title("Finding Work & Opportunity")
                .child(
                    S.list()
                        .title("Tools")
                        .items([
                            S.listItem()
                                .title("Job Boards")
                                .child(
                                    S.documentList()
                                        .title('Job Boards')
                                        .menuItems(S.documentTypeList('jobBoardSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'jobBoardSchema' })
                                ),
                            S.listItem()
                                .title("Freelance")
                                .child(
                                    S.documentList()
                                        .title('Freelance')
                                        .menuItems(S.documentTypeList('freelanceSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'freelanceSchema' })
                                ),
                            S.listItem()
                                .title("Apprenticeship")
                                .child(
                                    S.documentList()
                                        .title('Apprenticeship')
                                        .menuItems(S.documentTypeList('apprenticeshipSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'apprenticeshipSchema' })
                                ),
                            S.listItem()
                                .title("Full Time Work")
                                .child(
                                    S.documentList()
                                        .title('Fulltime Jobs')
                                        .menuItems(S.documentTypeList('fulltimeSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'fulltimeSchema' })
                                ),
                            S.listItem()
                                .title("Community")
                                .child(
                                    S.documentList()
                                        .title('Community')
                                        .menuItems(S.documentTypeList('communitySchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'communitySchema' })
                                ),
                            S.listItem()
                                .title("Startup Resources")
                                .child(
                                    S.documentList()
                                        .title('Startup')
                                        .menuItems(S.documentTypeList('startupSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'startupSchema' })
                                ),
                            S.listItem()
                                .title("Mentorship")
                                .child(
                                    S.documentList()
                                        .title('Mentorship')
                                        .menuItems(S.documentTypeList('mentorshipSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'mentorshipSchema' })
                                ),
                            S.listItem()
                                .title("Digital Nomadism")
                                .child(
                                    S.documentList()
                                        .title('Digital Nomadism')
                                        .menuItems(S.documentTypeList('nomadSchema').getMenuItems())
                                        .filter('_type == $type && !defined(parents)')
                                        .params({ type: 'nomadSchema' })
                                ),
                        ])
                ),

        ]);