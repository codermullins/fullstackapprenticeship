import icon from 'react-icons/lib/md/local-movies'

export default {
    name: 'awsSchema',
    title: 'AWS',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'tool',
            title: 'AWS Resource',
            type: 'string',
            options: {
                list: [
                    {title: 'S3', value: 'S3'},
                    {title: 'EC2', value: 'EC2'},
                    {title: 'Lambda', value: 'Lambda'},
                    {title: 'Amplify', value: 'Amplify'},

                ],
                layout: 'dropdown'
            }
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Tutorial', value: 'Tutorial'},
                    {title: 'Article', value: 'Article'},
                    {title: 'Video', value: 'Video'},
                    {title: 'Resource', value: 'Resource'}

                ],
                layout: 'dropdown'
            }
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'blockContent'
        },
        {
            name: 'url',
            title: 'URL',
            type: 'string'
        },
        {
            name: 'priority',
            title: 'Priority',
            type: 'string'
        },
        {
            name: 'website',
            title: 'Website',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100
            }
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true
            }
        },
    ],
    preview: {
        select: {
            title: 'title',
            type: 'type',
            media: 'logo',

        },
        prepare(selection) {
            const year = selection.date && selection.date.split('-')[0]

            return {
                title: `${selection.title} ${year ? `(${year})` : ''}`,
                date: selection.date,
                subtitle: selection.type,
                media: selection.media
            }
        }
    }
}
