// GOAL: # of unique companies a person is associated with
// want: the # of (person, company) as the key 
db.companies.aggregate([
    {$match: {"relationships.person": {$ne: null}}},
    {$project: {relationships: 1, name: 1, _id: 0}},
    {$unwind: "$relationships"},
    {$group: {
        _id: "$relationships.person",
        company: "$name"
    }},
    {$group: {_id: "$_id.person"}, count: {$sum: 1}},
    {$sort: {count: -1}}
]);
