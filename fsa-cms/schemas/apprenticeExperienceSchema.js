import icon from 'react-icons/lib/md/local-movies'

export default {
    name: 'apprenticeExperienceSchema',
    title: 'Apprentice',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Apprenticeship', value: 'Apprenticeship'},
                    {title: 'Developer', value: 'Developer'},
                    {title: 'Excercise', value: 'Excercise'},
                    {title: 'Mentorship', value: 'Mentorship'}

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
            name: 'amount',
            title: 'Amount',
            type: 'string'
        },
        {
            name: 'req1',
            title: 'Requirement 1',
            type: 'string'
        },
        {
            name: 'req2',
            title: 'Requirement 2',
            type: 'string'
        },
        {
            name: 'req3',
            title: 'Requirement 3',
            type: 'string'
        },
        {
            name: 'priority',
            title: 'Priority',
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
