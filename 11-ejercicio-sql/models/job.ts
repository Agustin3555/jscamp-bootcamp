import crypto from 'node:crypto'
import { db } from '../db/database'
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from '../types'

const mapRowToJob = (row: any): Job => {
  const technologies = row.technologies
    ? row.technologies.split(',').filter(Boolean)
    : []

  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    description: row.job_description,
    data: {
      technology: technologies,
      modality: row.modality,
      level: row.level,
    },
    content: row.content_id
      ? {
          description: row.content_description,
          responsibilities: row.content_responsibilities,
          requirements: row.content_requirements,
          about: row.content_about,
        }
      : undefined,
  }
}

export class JobModel {
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    let query = `
      SELECT
        jobs.id,
        jobs.title,
        jobs.company,
        jobs.location,
        jobs.description AS job_description,
        jobs.modality,
        jobs.level,
        GROUP_CONCAT(job_technologies.technology) AS technologies,
        job_content.id AS content_id,
        job_content.description AS content_description,
        job_content.responsibilities AS content_responsibilities,
        job_content.requirements AS content_requirements,
        job_content.about AS content_about
      FROM jobs
      LEFT JOIN job_technologies ON jobs.id = job_technologies.job_id
      LEFT JOIN job_content ON jobs.id = job_content.job_id
    `

    const conditions: string[] = []
    const params: string[] = []

    if (filters?.tech) {
      conditions.push(
        'jobs.id IN (SELECT job_id FROM job_technologies WHERE technology = ?)',
      )
      params.push(filters.tech)
    }

    if (filters?.modality) {
      conditions.push('jobs.modality = ?')
      params.push(filters.modality)
    }

    if (filters?.level) {
      conditions.push('jobs.level = ?')
      params.push(filters.level)
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    query += ` GROUP BY jobs.id ORDER BY jobs.title ASC`

    const rows = db.prepare(query).all(...params)
    return rows.map(mapRowToJob)
  }

  static async getById(id: string): Promise<Job | undefined> {
    const query = `
      SELECT
        jobs.id,
        jobs.title,
        jobs.company,
        jobs.location,
        jobs.description AS job_description,
        jobs.modality,
        jobs.level,
        GROUP_CONCAT(job_technologies.technology) AS technologies,
        job_content.id AS content_id,
        job_content.description AS content_description,
        job_content.responsibilities AS content_responsibilities,
        job_content.requirements AS content_requirements,
        job_content.about AS content_about
      FROM jobs
      LEFT JOIN job_technologies ON jobs.id = job_technologies.job_id
      LEFT JOIN job_content ON jobs.id = job_content.job_id
      WHERE jobs.id = ?
      GROUP BY jobs.id
    `

    const row = db.prepare(query).get(id)
    if (!row) return undefined
    return mapRowToJob(row)
  }

  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    }

    const insertJob = db.prepare(`
      INSERT INTO jobs (id, title, company, location, description, modality, level)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const insertTechnology = db.prepare(`
      INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`)

    const insertContent = db.prepare(`
      INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const transaction = db.transaction((job: Job) => {
      insertJob.run(
        job.id,
        job.title,
        job.company,
        job.location,
        job.description,
        job.data.modality,
        job.data.level,
      )

      for (const technology of job.data.technology) {
        insertTechnology.run(job.id, technology)
      }

      if (job.content) {
        insertContent.run(
          crypto.randomUUID(),
          job.id,
          job.content.description,
          job.content.responsibilities,
          job.content.requirements,
          job.content.about,
        )
      }
    })

    transaction(newJob)
    return newJob
  }

  static async delete(id: string): Promise<boolean> {
    const result = db.prepare('DELETE FROM jobs WHERE id = ?').run(id)
    return result.changes > 0
  }

  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const existingJob = await JobModel.getById(id)
    if (!existingJob) return null

    const updateFields: string[] = []
    const params: string[] = []

    if (input.title) {
      updateFields.push('title = ?')
      params.push(input.title)
    }

    if (input.company) {
      updateFields.push('company = ?')
      params.push(input.company)
    }

    if (input.location) {
      updateFields.push('location = ?')
      params.push(input.location)
    }

    if (input.description) {
      updateFields.push('description = ?')
      params.push(input.description)
    }

    if (input.data?.modality) {
      updateFields.push('modality = ?')
      params.push(input.data.modality)
    }

    if (input.data?.level) {
      updateFields.push('level = ?')
      params.push(input.data.level)
    }

    const transaction = db.transaction(() => {
      if (updateFields.length > 0) {
        const query = `UPDATE jobs SET ${updateFields.join(', ')} WHERE id = ?`
        db.prepare(query).run(...params, id)
      }

      if (input.data?.technology) {
        db.prepare('DELETE FROM job_technologies WHERE job_id = ?').run(id)
        const insertTechnology = db.prepare(
          'INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)',
        )
        for (const technology of input.data.technology) {
          insertTechnology.run(id, technology)
        }
      }

      if (input.content) {
        const existingContent = db
          .prepare('SELECT id FROM job_content WHERE job_id = ?')
          .get(id)

        if (existingContent) {
          db.prepare(
            `
            UPDATE job_content
            SET description = ?, responsibilities = ?, requirements = ?, about = ?
            WHERE job_id = ?
          `,
          ).run(
            input.content.description,
            input.content.responsibilities,
            input.content.requirements,
            input.content.about,
            id,
          )
        } else {
          db.prepare(
            `
            INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
            VALUES (?, ?, ?, ?, ?, ?)
          `,
          ).run(
            crypto.randomUUID(),
            id,
            input.content.description,
            input.content.responsibilities,
            input.content.requirements,
            input.content.about,
          )
        }
      }
    })

    transaction()
    return (await JobModel.getById(id)) ?? null
  }
}
